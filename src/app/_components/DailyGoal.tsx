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
      <div className="w-full h-full flex flex-col p-4 border rounded-xl">Loading...</div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4 border shadow-sm backdrop:blur-sm rounded-xl">
      <GoalHeader />
      <div className="flex flex-col gap-3 mt-6 relative flex-1">
        <GoalChartWrapper data={progressPercentage} isActive={isActive} autoPaused={autoPaused} />
        <GoalStats
          progress={displayedProgress!}
          isActive={isActive}
          onSettingsAction={handleStart}  // pass settings callback
        />
      </div>
    </div>
  );
}
