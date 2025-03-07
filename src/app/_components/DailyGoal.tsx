"use client";
import React from "react";
import GoalHeader from "./GoalHeader";
import GoalChartWrapper from "./GoalChartWrapper";
import GoalStats from "./GoalStats";
import { useDailyGoal } from "../_hooks/useDailyGoal";

export default function DailyGoal() {
  const {
    isActive,
    displayedProgress,
    progressPercentage,
    isLoading,
    autoPaused,
    handleStart,
  } = useDailyGoal();

  if (isLoading) {
    return (
      <div className="w-full h-fit flex flex-col p-4 border rounded-xl">Loading...</div>
    );
  }

  return (
    <div className="w-full h-fit flex flex-col p-4 border rounded-xl">
      <GoalHeader />
      <div className="flex flex-col gap-3 mt-6 relative">
        <GoalChartWrapper data={progressPercentage} isActive={isActive} autoPaused={autoPaused} />
        <GoalStats
          progress={displayedProgress!}
          isActive={isActive}
          onSettings={handleStart}  // pass settings callback
        />
      </div>
    </div>
  );
}
