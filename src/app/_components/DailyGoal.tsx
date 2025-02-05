"use client";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLearningProgress, updateTodayMinutes } from "../supabase/data-service";
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
  const queryClient = useQueryClient();

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

  // Calculăm procentajul de progres
  const progressPercentage = progress
    ? Math.round((progress.today_minutes / progress.total_goal) * 100)
    : 0;

  const handleStart = () => {
    setIsActive(true);
    // Alte acțiuni la start pot fi adăugate aici
  };

  const handlePause = () => {
    setIsActive(false);
    // Alte acțiuni la pauză pot fi adăugate aici
  };

  // Actualizare a valorii din DB la fiecare minut, când sesiunea este activă
  useEffect(() => {
    if (isActive && progress) {
      const timer = setInterval(() => {
        const now = new Date();
        const progressDate = new Date(progress.created_at);
        if (now.toDateString() !== progressDate.toDateString()) {
          // Dacă data s-a schimbat, resetăm minutele la 0
          updateMinuteMutation.mutate({ id: progress.id, minutes: 0 });
        } else {
          const newMinutes = progress.today_minutes + 1;
          updateMinuteMutation.mutate({ id: progress.id, minutes: newMinutes });
        }
      }, 60000);
      return () => clearInterval(timer);
    }
  }, [isActive, progress, updateMinuteMutation]);

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
        <GoalChartWrapper data={progressPercentage} isActive={isActive} />
        {/* Transmitem progress ca prop către GoalStats */}
        <GoalStats progress={progress!} onStart={handleStart} onPause={handlePause} />
      </div>
    </div>
  );
}
