"use client";

import dynamic from "next/dynamic";
import InfoSign from "./InfoSign";
import Rocket from "./Icons/Rocket";
import { useLearningGoal } from "../hooks/useLearningGoal";
import { useLearningState } from "../hooks/useLearningState";
import { useEffect, useState } from "react";

const DynamicChart = dynamic(() => import("./GoalChart"), { ssr: false });

const GoalHeader = () => (
  <div className="flex gap-2">
    <h1 className="font-semibold">Goals</h1>
    <InfoSign info="Here you can see the progress of your daily goals" />
  </div>
);

const GoalChart = ({ data, isActive }: { data: number; isActive: boolean }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Update animation state after hydration
    setShouldAnimate(isActive);
  }, [isActive]);

  return (
    <div className="mx-auto relative w-24 h-24">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <DynamicChart data={data} />
        <div className={shouldAnimate ? "animate-pulse" : ""}>
          <Rocket color={shouldAnimate ? '#16a34a' : ''}/>
        </div>
      </div>
    </div>
  );
};

const GoalStats = ({
  currentMinutes,
  totalGoal,
  streak,
  isActive,
  hasStartedToday,
  onStart,
  onPause,
  formattedDates,
  isHydrated,
}: {
  currentMinutes: number;
  totalGoal: number;
  streak: { days: number; startDate: Date; endDate: Date };
  isActive: boolean;
  isPaused: boolean;
  hasStartedToday: boolean;
  onStart: () => void;
  onPause: () => void;
  formattedDates: { startDate: string; endDate: string };
  isHydrated: boolean;
}) => (
  <div className="flex flex-col gap-4">
    <h2 className="text-neutral-400 text-center font-semibold text-sm">
      Daily Goal:{" "}
      <span className="font-bold text-black">
        {isHydrated ? `${currentMinutes}/${totalGoal} minutes` : "Loading..."}
      </span>
    </h2>

    <hr className="w-3/4 mx-auto" />

    <div className="text-center">
      <h2 className="text-neutral-400 font-semibold text-sm">
        Your Longest Streak:{" "}
        <span className="font-bold text-black">
          {streak.days} {streak.days === 1 ? "Day" : "Days"}
        </span>
      </h2>
      <p className="text-sm font-semibold text-neutral-400">
        ({formattedDates.startDate} - {formattedDates.endDate})
      </p>
    </div>

    <button
      onClick={isActive ? onPause : onStart}
      className="self-start sm:self-auto w-fit mx-auto font-semibold underline-offset-[5px] border-b-2 border-blueLotus text-blueLotus hover:opacity-80 active:scale-95 transition-all duration-200 text-sm sm:text-base"
    >
      {isActive ? "Pause Learning" : hasStartedToday ? "Continue Learning" : "Start Learning"}
    </button>
  </div>
);

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
        <GoalChart data={progressPercentage} isActive={isActive} />
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
