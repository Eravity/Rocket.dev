"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLearningProgress, updateTodayMinutes, ensureLearningProgress } from "../supabase/data-service";

export interface LearningProgress {
  id: string;
  today_minutes: number;
  total_goal: number;
  streak_days: number;
  streak_start: string;
  streak_end: string;
  progress_percentage: number;
  created_at: string;
}

export function useDailyGoal() {
  const [isActive, setIsActive] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  const [sessionElapsed, setSessionElapsed] = useState(0);
  const [storedMinutes, setStoredMinutes] = useState(0); // NEW: state for effective minutes from localStorage
  const queryClient = useQueryClient();
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Start handler
  const handleStart = () => {
    const now = new Date();
    setIsActive(true);
    setAutoPaused(false);
    setLastUpdateTime(now);
    localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
    // NEW: initialize effective minutes to 0 in localStorage
    localStorage.setItem("todayMinutes", "0");
  };

  // Update initialization effect to start timer immediately on first visit
  useEffect(() => {
    const storedTime = localStorage.getItem("dailyGoalLastUpdateTime");
    const storedMinutesVal = localStorage.getItem("todayMinutes");
    if (storedTime) {
      setLastUpdateTime(new Date(storedTime));
      setStoredMinutes(Number(storedMinutesVal) || 0);
      setIsActive(true);
    } else {
      handleStart();
    }
  }, []);

  // React Query: fetch latest learning progress
  const { data: progress, isLoading } = useQuery<LearningProgress>({
    queryKey: ["learningProgress"],
    queryFn: async () => {
      const data = await getLearningProgress();
      return data.reduce((prev, curr) =>
        new Date(curr.created_at).getTime() > new Date(prev.created_at).getTime() ? curr : prev
      );
    },
    refetchInterval: 30000,
  });

  // Mutation to update minutes
  const updateMinutes = useMutation({
    mutationFn: ({ id, minutes }: { id: string; minutes: number }) => updateTodayMinutes(id, minutes),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["learningProgress"] }),
  });

  // Timer update effect: accumulate active minutes without resetting on pause
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && lastUpdateTime && progress && !autoPaused) {
      interval = setInterval(() => {
        const diff = Date.now() - lastUpdateTime.getTime();
        if (diff >= 60000) { // if at least 1 minute passed
          const minutesDiff = Math.floor(diff / (1000 * 60));
          setSessionElapsed(prev => prev + minutesDiff);
          setLastUpdateTime(new Date());
        }
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [isActive, lastUpdateTime, progress, autoPaused]);

  // Compute progress combining DB and local elapsed
  const displayedProgress = useMemo(() => {
    if (progress && lastUpdateTime) {
      const now = new Date();
      const progressDate = new Date(progress.created_at);
      const minutes = now.toDateString() !== progressDate.toDateString() ? 0 : storedMinutes + sessionElapsed;
      return { ...progress, today_minutes: minutes };
    }
    return progress;
  }, [progress, lastUpdateTime, sessionElapsed, storedMinutes]);

  const progressPercentage = displayedProgress
    ? Math.round((displayedProgress.today_minutes / displayedProgress.total_goal) * 100)
    : 0;

  // Inactivity effect with logging on resume/pause
  useEffect(() => {
    const resetInactivity = (e?: Event) => {
      if (e && autoPaused) {
        console.info("Activity detected: Timer resumed");
        setAutoPaused(false);
        setLastUpdateTime(new Date());
      }
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => {
        if (isActive && !autoPaused) {
          console.info("AFK: Timer paused");
          setAutoPaused(true);
        }
      }, 60000); // 1 minute timeout
    };
    document.addEventListener("mousemove", resetInactivity);
    document.addEventListener("mousedown", resetInactivity);
    document.addEventListener("scroll", resetInactivity);
    document.addEventListener("touchstart", resetInactivity);
    return () => {
      document.removeEventListener("mousemove", resetInactivity);
      document.removeEventListener("mousedown", resetInactivity);
      document.removeEventListener("scroll", resetInactivity);
      document.removeEventListener("touchstart", resetInactivity);
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [autoPaused, isActive]);

  // Visibility change: update DB when tab changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      const now = new Date();
      if (document.visibilityState === "hidden" && isActive) {
        setLastUpdateTime(now);
      }
      if (
        document.visibilityState === "visible" &&
        isActive &&
        progress &&
        lastUpdateTime
      ) {
        const elapsed = Math.floor((now.getTime() - lastUpdateTime.getTime()) / (1000 * 60));
        if (elapsed >= 10) {
          // only update DB if at least 10 min have passed
          const progressDate = new Date(progress.created_at);
          const newMinutes =
            now.toDateString() !== progressDate.toDateString()
              ? 0
              : storedMinutes + elapsed;
          updateMinutes.mutate({ id: progress.id, minutes: newMinutes });
          setStoredMinutes(newMinutes);
          setLastUpdateTime(now);
          localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
          localStorage.setItem("todayMinutes", newMinutes.toString());
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isActive, progress, lastUpdateTime, updateMinutes, storedMinutes]);

  // Ensure streak functionality on mount
  useEffect(() => {
    (async () => {
      try {
        await ensureLearningProgress();
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  // Update DB on mount or when progress loads
  useEffect(() => {
    if (isActive && progress && lastUpdateTime) {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - lastUpdateTime.getTime()) / (1000 * 60));
      if (elapsed >= 10) {
        // also check for 10 min threshold here
        const newMinutes = storedMinutes + elapsed;
        updateMinutes.mutate({ id: progress.id, minutes: newMinutes });
        setStoredMinutes(newMinutes);
        setLastUpdateTime(now);
        localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
        localStorage.setItem("todayMinutes", newMinutes.toString());
      }
    }
  }, [isActive, progress, updateMinutes, lastUpdateTime, storedMinutes]);

  // Add fallback: Sync progress every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive && progress && lastUpdateTime) {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - lastUpdateTime.getTime()) / (1000 * 60));
        if (elapsed >= 30) {
          const newMinutes = storedMinutes + elapsed;
          updateMinutes.mutate({ id: progress.id, minutes: newMinutes });
          setStoredMinutes(newMinutes);
          setLastUpdateTime(now);
          localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
          localStorage.setItem("todayMinutes", newMinutes.toString());
          console.info("Fallback sync: 30+ minutes elapsed, data updated");
        }
      }
    }, 30 * 60 * 1000); // every 30 minutes
    return () => clearInterval(interval);
  }, [isActive, progress, lastUpdateTime, updateMinutes, storedMinutes]);

  // Handle beforeunload: send final update if needed
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isActive && progress && lastUpdateTime) {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - lastUpdateTime.getTime()) / (1000 * 60));
        if (elapsed >= 10) {
          // Use navigator.sendBeacon if available for a synchronous request
          const url = "/api/sync-progress"; // endpoint to sync progress
          const data = JSON.stringify({ id: progress.id, minutes: storedMinutes + elapsed });
          if (navigator.sendBeacon) {
            navigator.sendBeacon(url, data);
          } else {
            // fallback: attempt fetch, but note these may be aborted
            fetch(url, { method: "POST", body: data, keepalive: true });
          }
        }
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isActive, progress, lastUpdateTime, storedMinutes]);

  return {
    isActive,
    autoPaused,
    displayedProgress,
    progressPercentage,
    isLoading,
    handleStart,  // used as settings callback now
  };
}
