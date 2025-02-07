"use client";
import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLearningProgress, updateTodayMinutes, ensureLearningProgress } from "../supabase/data-service";
import GoalHeader from "./GoalHeader";
import GoalChartWrapper from "./GoalChartWrapper";
import GoalStats from "./GoalStats";

// Definim interfața pentru datele de progres
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

export default function DailyGoal() {
  const [isActive, setIsActive] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false); // new state for inactivity pause
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  // local elapsed minutes for UI feedback
  const [localElapsed, setLocalElapsed] = useState(0);
  const queryClient = useQueryClient();
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // On mount, restore lastUpdateTime from localStorage
  useEffect(() => {
    const storedTime = localStorage.getItem("dailyGoalLastUpdateTime");
    if (storedTime) {
      setLastUpdateTime(new Date(storedTime));
      setIsActive(true);
    }
  }, []);

  // Auto start timer on article click (assumes articles dispatch a custom "article-click" event)
  useEffect(() => {
    function onArticleClick() {
      if (!isActive) {
        handleStart();
      }
    }
    document.addEventListener("article-click", onArticleClick);
    return () => document.removeEventListener("article-click", onArticleClick);
  }, [isActive]);

  // Folosim React Query pentru a prelua cel mai recent progress
  const { data: progress, isLoading } = useQuery<LearningProgress>({
    queryKey: ["learningProgress"],
    queryFn: async () => {
      const data: LearningProgress[] = await getLearningProgress();
      // Alegem cel mai recent entry pe baza datei de creare
      return data.reduce((prev, current) =>
        new Date(current.created_at).getTime() > new Date(prev.created_at).getTime() ? current : prev
      );
    },
    refetchInterval: 30000, // refetch la fiecare 30 secunde
  });

  // Mutatie pentru actualizarea minutelelor
  const updateMinuteMutation = useMutation<
    null,
    Error,
    { id: string; minutes: number }
  >({
    mutationFn: ({ id, minutes }) => updateTodayMinutes(id, minutes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learningProgress"] });
    },
  });

  // Update local timer every second when active so UI updates in real time.
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && lastUpdateTime && progress && !autoPaused) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsedMs = now.getTime() - lastUpdateTime.getTime();
        const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));
        setLocalElapsed(elapsedMinutes);
      }, 1000);
    } else {
      setLocalElapsed(0);
    }
    return () => interval && clearInterval(interval);
  }, [isActive, lastUpdateTime, progress, autoPaused]);

  // Compute displayed progress (combining DB value and local elapsed)
  const displayedProgress = progress && lastUpdateTime ? (() => {
    const now = new Date();
    const progressDate = new Date(progress.created_at);
    const computed =
      now.toDateString() !== progressDate.toDateString() ? 0 : progress.today_minutes + localElapsed;
    return { ...progress, today_minutes: computed };
  })() : progress;

  // Calculăm procentajul de progres
  const progressPercentage = displayedProgress
    ? Math.round((displayedProgress.today_minutes / displayedProgress.total_goal) * 100)
    : 0;

  const handleStart = () => {
    const now = new Date();
    setIsActive(true);
    setAutoPaused(false);
    setLastUpdateTime(now);
    localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
    // Alte acțiuni la start pot fi adăugate aici
  };

  const handlePause = () => {
    setIsActive(false);
    setAutoPaused(false);
    localStorage.removeItem("dailyGoalLastUpdateTime");
    // Alte acțiuni la pauză pot fi adăugate aici
  };

  // Inactivity effect: pause timer after 1 minute of no activity, resume on activity.
  useEffect(() => {
    function resetInactivity(e?: Event) {
      // Only resume on an actual event: log activity detected
      if (e && autoPaused) {
        setAutoPaused(false);
        setLastUpdateTime(new Date());
      }
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => {
        if (isActive && !autoPaused) {
          setAutoPaused(true);
        }
      }, 1000 * 60); // 1 minute timeout
    }
    // Do not call resetInactivity() here to avoid auto-resume on mount
    document.addEventListener("mousemove", resetInactivity);
    document.addEventListener("mousedown", resetInactivity);
    document.addEventListener("scroll", resetInactivity);
    document.addEventListener("touchstart", resetInactivity);
    return () => {
      document.removeEventListener("mousemove", resetInactivity);
      document.removeEventListener("mousedown", resetInactivity);
      document.removeEventListener("scroll", resetInactivity);
      document.removeEventListener("touchstart", resetInactivity);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [autoPaused, isActive]);

  // Actualizare la schimbarea filului: atunci când document devine hidden,
  // dacă sesiunea e activă, calculăm timpul scurs și actualizăm DB.
  useEffect(() => {
    function handleVisibilityChange() {
      const now = new Date();
      if (document.visibilityState === "hidden") {
        if (isActive) {
          // Just update lastUpdateTime when tab is hidden.
          setLastUpdateTime(now);
        }
      }
      if (document.visibilityState === "visible") {
        if (isActive && progress && lastUpdateTime) {
          const elapsedMs = now.getTime() - lastUpdateTime.getTime();
          const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));
          const progressDate = new Date(progress.created_at);
          const newMinutes =
            now.toDateString() !== progressDate.toDateString()
              ? 0
              : progress.today_minutes + elapsedMinutes;
          updateMinuteMutation.mutate({ id: progress.id, minutes: newMinutes });
          setLastUpdateTime(now);
          localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
        }
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isActive, progress, lastUpdateTime, updateMinuteMutation]);

  // Ensure streak functionality on mount:
  useEffect(() => {
    (async () => {
      try {
        await ensureLearningProgress();
        // Optionally, you can invalidate/reactivate your query here if needed:
        // queryClient.invalidateQueries({ queryKey: ["learningProgress"] });
      } catch (error) {
        console.error("Error ensuring learning progress:", error);
      }
    })();
  }, []);

  // New effect: On component mount (or when progress loads), update DB with elapsed time.
  useEffect(() => {
    if (isActive && progress && lastUpdateTime) {
      const now = new Date();
      const elapsedMs = now.getTime() - lastUpdateTime.getTime();
      const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));
      if (elapsedMinutes > 0) {
        updateMinuteMutation.mutate({
          id: progress.id,
          minutes: progress.today_minutes + elapsedMinutes,
        });
        setLastUpdateTime(now);
        localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
      }
    }
  }, [isActive, progress]); 

  if (isLoading) {
    return (
      <div className="w-full h-fit flex flex-col p-4 border rounded-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-fit flex flex-col p-4 border rounded-xl">
      <GoalHeader />
      <div className="flex flex-col gap-3 mt-6 relative">
        <GoalChartWrapper data={progressPercentage} isActive={isActive && !autoPaused} />
        {/* Pass updated progress to GoalStats */}
        <GoalStats progress={displayedProgress!} isActive={isActive && !autoPaused} onStart={handleStart} onPause={handlePause} />
      </div>
    </div>
  );
}
