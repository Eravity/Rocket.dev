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

  // Initialization effect
  useEffect(() => {
    const storedTime = localStorage.getItem("dailyGoalLastUpdateTime");
    const storedMinutesVal = localStorage.getItem("todayMinutes");
    const now = new Date();
    if (storedTime) {
      const storedDate = new Date(storedTime);
      if (now.toDateString() !== storedDate.toDateString()) {
        // Reset if from another day
        setLastUpdateTime(now);
        setStoredMinutes(0);
        localStorage.setItem("todayMinutes", "0");
      } else {
        // Always load stored values without resetting due to inactivity gap
        setLastUpdateTime(storedDate);
        setStoredMinutes(Number(storedMinutesVal) || 0);
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

  // Timer update effect: accumulate active minutes and persist them
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && lastUpdateTime && !autoPaused) { // removed "progress" from condition
      interval = setInterval(() => {
        const diff = Date.now() - lastUpdateTime.getTime();
        if (diff >= 60000) { // if at least 1 minute passed
          const minutesDiff = Math.floor(diff / (1000 * 60));
          setStoredMinutes(prev => {
            const newTotal = prev + minutesDiff;
            localStorage.setItem("todayMinutes", newTotal.toString());
            return newTotal;
          });
          setLastUpdateTime(new Date());
        }
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [isActive, lastUpdateTime, autoPaused]);

  // Updated: Compute progress using the maximum of storedMinutes and API value
  const displayedProgress = useMemo(() => {
    const localMinutes = storedMinutes;
    const dbMinutes = progress ? progress.today_minutes : 0;
    const finalMinutes = Math.max(localMinutes, dbMinutes);
    return progress
      ? { ...progress, today_minutes: finalMinutes }
      : {
          today_minutes: finalMinutes,
          total_goal: 0,
          streak_days: 0,
          streak_start: "",
          streak_end: "",
          progress_percentage: 0,
          created_at: new Date().toISOString()
        };
  }, [progress, storedMinutes]);

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
