"use client";
import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLearningProgress, updateTodayMinutes, ensureLearningProgress } from "../supabase/data-service";
import { useInactivityTracker } from "./useInactivityTracker";
import { useProgressSync } from "./useProgressSync";

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
  const [storedMinutes, setStoredMinutes] = useState(0); // effective minutes from localStorage
  const queryClient = useQueryClient();

  // Start handler
  const handleStart = () => {
    const now = new Date();
    setIsActive(true);
    setAutoPaused(false);
    setLastUpdateTime(now);
    localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
    localStorage.setItem("todayMinutes", "0");
  };

  // Initialization effect with validation
  useEffect(() => {
    const storedTime = localStorage.getItem("dailyGoalLastUpdateTime");
    const storedMinutesVal = localStorage.getItem("todayMinutes");
    const now = new Date();

    const resetStorage = () => {
      setLastUpdateTime(now);
      setStoredMinutes(0);
      localStorage.setItem("todayMinutes", "0");
      localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
    };

    if (storedTime) {
      const storedDate = new Date(storedTime);
      const storedMinutes = Number(storedMinutesVal) || 0;
      
      if (now.toDateString() !== storedDate.toDateString()) {
        console.debug("[Daily Goal] New day detected, resetting storage");
        resetStorage();
      } else {
        // Always set lastUpdateTime to now on page load to prevent immediate increment
        setLastUpdateTime(now);
        setStoredMinutes(storedMinutes);
        localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
      }
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
        new Date(curr.created_at).getTime() >
        new Date(prev.created_at).getTime()
          ? curr
          : prev
      );
    },
    refetchInterval: 30000,
  });

  // Mutation to update minutes
  const updateMinutes = useMutation({
    mutationFn: ({ id, minutes }: { id: string; minutes: number }) => updateTodayMinutes(id, minutes),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["learningProgress"] }),
  });

  // Timer update effect with safety check
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && lastUpdateTime && !autoPaused) { // runs only when not paused (AFK)
      interval = setInterval(() => {
        const diff = Date.now() - lastUpdateTime.getTime();
        if (diff >= 60000) { // each minute elapsed
          const minutesDiff = Math.floor(diff / (1000 * 60));
          // Add safety check for reasonable increment
          if (minutesDiff > 60) { // If more than an hour has passed
            console.warn("[Timer Effect] Unreasonable time increment detected, resetting timer");
            setLastUpdateTime(new Date());
            return;
          }
          console.debug("[Timer Effect] Adding", minutesDiff, "minute(s); diff =", diff, "ms");
          setStoredMinutes(prev => {
            const newTotal = prev + minutesDiff;
            // Add safety check for total minutes
            if (newTotal > 960) { // More than 16 hours
              console.warn("[Timer Effect] Unreasonable total minutes detected");
              return prev;
            }
            localStorage.setItem("todayMinutes", newTotal.toString());
            console.debug("[Timer Effect] Updated storedMinutes:", newTotal);
            return newTotal;
          });
          // Update lastUpdateTime to now.
          const newTime = new Date();
          setLastUpdateTime(newTime);
          console.debug("[Timer Effect] Updated lastUpdateTime:", newTime);
        }
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
        console.debug("[Timer Effect] Cleared timer interval");
      }
    };
  }, [isActive, lastUpdateTime, autoPaused]);

  // Add cleanup effect for page unload/visibility change
  useEffect(() => {
    const handleCleanup = () => {
      setIsActive(false);
      setAutoPaused(true);
      const now = new Date();
      localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
      console.debug("[Daily Goal] Cleanup: stopped timer");
    };

    window.addEventListener("beforeunload", handleCleanup);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        handleCleanup();
      }
    });

    return () => {
      window.removeEventListener("beforeunload", handleCleanup);
      document.removeEventListener("visibilitychange", handleCleanup);
    };
  }, []);

  // Updated: Compute progress so that while active, we use local storedMinutes directly.
  const displayedProgress = useMemo(() => {
    if (isActive) {
      return progress
        ? { ...progress, today_minutes: storedMinutes }
        : {
            today_minutes: storedMinutes,
            total_goal: 0,
            streak_days: 0,
            streak_start: "",
            streak_end: "",
            progress_percentage: 0,
            created_at: new Date().toISOString(),
          };
    } else {
      const dbMinutes = progress ? progress.today_minutes : 0;
      const finalMinutes = Math.max(storedMinutes, dbMinutes);
      return progress
        ? { ...progress, today_minutes: finalMinutes }
        : {
            today_minutes: finalMinutes,
            total_goal: 0,
            streak_days: 0,
            streak_start: "",
            streak_end: "",
            progress_percentage: 0,
            created_at: new Date().toISOString(),
          };
    }
  }, [progress, storedMinutes, isActive]);

  const progressPercentage = displayedProgress
    ? Math.round((displayedProgress.today_minutes / displayedProgress.total_goal) * 100)
    : 0;

  // Use custom hooks for inactivity tracking and progress sync
  useInactivityTracker(isActive, autoPaused, setAutoPaused, setLastUpdateTime);
  useProgressSync({
    isActive,
    progress: progress!,
    lastUpdateTime,
    storedMinutes,
    updateMinutes,
    setStoredMinutes,
    setLastUpdateTime,
  });

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

  return {
    isActive,
    autoPaused,
    displayedProgress,
    progressPercentage,
    isLoading,
    handleStart,  // used as settings callback now
  };
}
