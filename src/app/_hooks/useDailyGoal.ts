"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLearningProgress,
  updateTodayMinutes,
  ensureLearningProgress,
} from "../_supabase/data-service";
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
  // Declarații de stare
  const [isActive, setIsActive] = useState(false);
  const [displayedProgress, setDisplayedProgress] = useState<LearningProgress | null>(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [autoPaused, setAutoPaused] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  const [storedMinutes, setStoredMinutes] = useState(0);
  const queryClient = useQueryClient();

  // Handler pentru pornirea timer-ului
  const handleStart = () => {
    const now = new Date();
    setIsActive(true);
    setAutoPaused(false);
    setLastUpdateTime(now);
    localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
    localStorage.setItem("todayMinutes", "0");
  };

  // Efect de inițializare
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
      const storedMinutesNum = Number(storedMinutesVal) || 0;

      if (now.toDateString() !== storedDate.toDateString()) {
        console.debug("[Daily Goal] New day detected, resetting storage");
        resetStorage();
      } else {
        setLastUpdateTime(now);
        setStoredMinutes(storedMinutesNum);
        localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
      }
      setIsActive(true);
    } else {
      handleStart();
    }
  }, []);

  // React Query: fetch progress-ul de învățare
  const { data: progress, isLoading: queryLoading } = useQuery<LearningProgress>({
    queryKey: ["learningProgress"],
    queryFn: async () => {
      const data = await getLearningProgress();
      return data.reduce((prev, curr) =>
        new Date(curr.created_at).getTime() > new Date(prev.created_at).getTime() ? curr : prev
      );
    },
    refetchInterval: 30000,
  });

  // Mutation pentru actualizarea minutelor
  const updateMinutes = useMutation({
    mutationFn: ({ id, minutes }: { id: string; minutes: number }) =>
      updateTodayMinutes(id, minutes),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["learningProgress"] }),
  });

  // Efect pentru actualizarea timer-ului
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && lastUpdateTime && !autoPaused) {
      interval = setInterval(() => {
        const diff = Date.now() - lastUpdateTime.getTime();
        if (diff >= 60000) {
          const minutesDiff = Math.floor(diff / (1000 * 60));
          // Securitate: dacă s-a trecut mai mult de o oră, resetăm timer-ul
          if (minutesDiff > 60) {
            console.warn("[Timer Effect] Unreasonable time increment detected, resetting timer");
            setLastUpdateTime(new Date());
            return;
          }
          console.debug("[Timer Effect] Adding", minutesDiff, "minute(s); diff =", diff, "ms");
          setStoredMinutes((prev) => {
            const newTotal = prev + minutesDiff;
            // Securitate pentru totalul minutelor (peste 16 ore)
            if (newTotal > 960) {
              console.warn("[Timer Effect] Unreasonable total minutes detected");
              return prev;
            }
            localStorage.setItem("todayMinutes", newTotal.toString());
            console.debug("[Timer Effect] Updated storedMinutes:", newTotal);
            return newTotal;
          });
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

  // Efect pentru gestionarea evenimentelor de "beforeunload" și "visibilitychange"
  useEffect(() => {
    // Handler pentru evenimentul beforeunload
    const handleBeforeUnload = () => {
      setIsActive(false);
      setAutoPaused(true);
      const now = new Date();
      localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
      console.debug("[Daily Goal] beforeunload: stopping timer");
    };

    // Handler pentru schimbarea vizibilității paginii
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Când tab-ul devine inactiv, pauzează timer-ul
        setIsActive(false);
        setAutoPaused(true);
        const now = new Date();
        localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
        console.debug("[Daily Goal] Visibility change: tab hidden, pausing timer");
      } else if (document.visibilityState === "visible") {
        // Când tab-ul devine activ, resetează lastUpdateTime și reia timer-ul
        const now = new Date();
        setLastUpdateTime(now);
        setIsActive(true);
        setAutoPaused(false);
        localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
        console.debug("[Daily Goal] Visibility change: tab visible, resuming timer");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Actualizarea progresului afișat, procentajului și a stării de loading când query-ul se rezolvă
  useEffect(() => {
    if (!queryLoading && progress) {
      const computedProgress = isActive
        ? { ...progress, today_minutes: storedMinutes }
        : { ...progress, today_minutes: Math.max(storedMinutes, progress.today_minutes) };
      setDisplayedProgress(computedProgress);
      const computedPercentage = computedProgress.total_goal
        ? Math.round((computedProgress.today_minutes / computedProgress.total_goal) * 100)
        : 0;
      setProgressPercentage(computedPercentage);
      setLoading(false);
    }
  }, [queryLoading, progress, storedMinutes, isActive]);

  // Hook-uri custom pentru inactivity tracking și progress sync
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

  // Asigură funcționalitatea streak la montare
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
    displayedProgress,
    progressPercentage,
    isLoading,
    autoPaused,
    handleStart,
  };
}
