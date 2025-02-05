"use client";
import React, { useState, useMemo, useCallback } from "react";
import { LearningProgress } from "./DailyGoal";

interface GoalStatsProps {
  progress: LearningProgress;
  onStart: () => void;
  onPause: () => void;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
};

export default function GoalStats({ progress, onStart, onPause }: GoalStatsProps) {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = useCallback(() => {
    if (isActive) {
      onPause();
    } else {
      onStart();
    }
    setIsActive((prev) => !prev);
  }, [isActive, onPause, onStart]);

  // Calculăm numărul de zile din streak (inclusiv începutul și sfârșitul)
  const computedStreakDays = useMemo(() => {
    const start = new Date(progress.streak_start);
    const end = new Date(progress.streak_end);
    const diffDays =
      Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  }, [progress]);

  const formattedDates = useMemo(() => {
    return `${formatDate(progress.streak_start)} - ${formatDate(
      progress.streak_end
    )}`;
  }, [progress]);

  return (
    <div className="flex flex-col gap-4">
      {/* Afișăm starea daily goal */}
      <h2 className="text-neutral-400 text-center font-semibold text-sm">
        Daily Goal:{" "}
        <span className="font-bold text-black">
          {`${progress.today_minutes}/${progress.total_goal} minutes`}
        </span>
      </h2>
      <hr className="w-3/4 mx-auto" />
      {/* Afișăm informații despre streak */}
      <div className="text-center">
        <h2 className="text-neutral-400 font-semibold text-sm">
          Your Longest Streak:{" "}
          <span className="font-bold text-black">
            {`${computedStreakDays} ${computedStreakDays === 1 ? "Day" : "Days"}`}
          </span>
        </h2>
        <p className="text-sm font-semibold text-neutral-400">
          {formattedDates}
        </p>
      </div>
      {/* Butonul de start / pause */}
      <button
        onClick={handleToggle}
        className="self-center font-semibold underline-offset-[5px] border-b-2 border-blueLotus text-blueLotus hover:opacity-80 active:scale-95 transition-all duration-200 text-sm sm:text-base"
      >
        {isActive ? "Pause Learning" : "Start Learning"}
      </button>
    </div>
  );
}
