"use client";
import { useLearningGoal } from "../hooks/useLearningGoal";
import { useLearningState } from "../hooks/useLearningState";
import { useEffect, useState } from "react";
import GoalHeader from "./GoalHeader";
import GoalChartWrapper from "./GoalChartWrapper";
import GoalStats from "./GoalStats";

export default function DailyGoal() {
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  const {
    isActive,
    todayMinutes,
    totalGoal,
    streak,
    startLearning,
    pauseLearning,
    progressPercentage,
    formattedDates,
  } = useLearningGoal(30);

  const { learningState, updateLearningState } = useLearningState();

  const handleStart = () => {
    updateLearningState({ hasStartedToday: true, isPaused: false });
    startLearning();
  };

  const handlePause = () => {
    updateLearningState({ isPaused: true });
    pauseLearning();
  };

  if (!isClientSide) {
    return <div className="w-full h-fit flex flex-col p-4 border rounded-xl">Loading...</div>;
  }

  return (
    <div className="w-full h-fit flex flex-col p-4 border rounded-xl">
      <GoalHeader />
      <div className="flex flex-col gap-3 mt-6">
        <GoalChartWrapper data={progressPercentage} isActive={isActive} />
        <GoalStats
          currentMinutes={todayMinutes}
          totalGoal={totalGoal}
          streak={streak}
          isActive={isActive}
          isPaused={learningState.isPaused}
          hasStartedToday={learningState.hasStartedToday}
          onStart={handleStart}
          onPause={handlePause}
          formattedDates={formattedDates}
          isHydrated={isClientSide}
        />
      </div>
    </div>
  );
}
