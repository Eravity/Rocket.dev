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
  const [localElapsed, setLocalElapsed] = useState(0);
  const queryClient = useQueryClient();
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Start handler
  const handleStart = () => {
    const now = new Date();
    setIsActive(true);
    setAutoPaused(false);
    setLastUpdateTime(now);
    localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
  };

  // Update initialization effect to start timer immediately on first visit
  useEffect(() => {
    const stored = localStorage.getItem("dailyGoalLastUpdateTime");
    if (stored) {
      setLastUpdateTime(new Date(stored));
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

  // Update elapsed timer every second while active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && lastUpdateTime && progress && !autoPaused) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - lastUpdateTime.getTime()) / (1000 * 60));
        setLocalElapsed(elapsed);
      }, 1000);
    } else {
      setLocalElapsed(0);
    }
    return () => interval && clearInterval(interval);
  }, [isActive, lastUpdateTime, progress, autoPaused]);

  // Compute progress combining DB and local elapsed
  const displayedProgress = useMemo(() => {
    if (progress && lastUpdateTime) {
      const now = new Date();
      const progressDate = new Date(progress.created_at);
      const minutes = now.toDateString() !== progressDate.toDateString() ? 0 : progress.today_minutes + localElapsed;
      return { ...progress, today_minutes: minutes };
    }
    return progress;
  }, [progress, lastUpdateTime, localElapsed]);

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
              : progress.today_minutes + elapsed;
          updateMinutes.mutate({ id: progress.id, minutes: newMinutes });
          setLastUpdateTime(now);
          localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isActive, progress, lastUpdateTime, updateMinutes]);

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
        updateMinutes.mutate({ id: progress.id, minutes: progress.today_minutes + elapsed });
        setLastUpdateTime(now);
        localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
      }
    }
  }, [isActive, progress, updateMinutes, lastUpdateTime]);

  // Add fallback: Sync progress every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive && progress && lastUpdateTime) {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - lastUpdateTime.getTime()) / (1000 * 60));
        if (elapsed >= 30) {
          updateMinutes.mutate({ id: progress.id, minutes: progress.today_minutes + elapsed });
          setLastUpdateTime(now);
          localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
          console.info("Fallback sync: 30+ minutes elapsed, data updated");
        }
      }
    }, 30 * 60 * 1000); // every 30 minutes
    return () => clearInterval(interval);
  }, [isActive, progress, lastUpdateTime, updateMinutes]);

  // Handle beforeunload: send final update if needed
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isActive && progress && lastUpdateTime) {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - lastUpdateTime.getTime()) / (1000 * 60));
        if (elapsed >= 10) {
          // Use navigator.sendBeacon if available for a synchronous request
          const url = "/api/sync-progress"; // endpoint to sync progress
          const data = JSON.stringify({ id: progress.id, minutes: progress.today_minutes + elapsed });
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
  }, [isActive, progress, lastUpdateTime]);

  return {
    isActive,
    autoPaused,
    displayedProgress,
    progressPercentage,
    isLoading,
    handleStart,  // used as settings callback now
  };
}
