"use client";
import React, { useMemo } from "react";

interface GoalStatsProps {
  progress: {
    streak_start: string;
    streak_end: string;
    today_minutes: number;
    total_goal: number;
  } | null;
  isActive: boolean;
  onSettings: () => void;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
};

export default function GoalStats({ progress, onSettings }: GoalStatsProps) {
  // Compute streak days
  const computedStreakDays = useMemo(() => {
    if (!progress || !progress.streak_start || !progress.streak_end) {
      return 0;
    }
    const start = new Date(progress.streak_start);
    const end = new Date(progress.streak_end);
    return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  }, [progress]);

  const formattedDates = useMemo(() => {
    if (!progress || !progress.streak_start || !progress.streak_end) {
      return "";
    }
    return `${formatDate(progress.streak_start)} - ${formatDate(progress.streak_end)}`;
  }, [progress]);

  const handleSettings = () => {
    onSettings();
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-neutral-400 text-center font-semibold text-sm">
        Daily Goal:{" "}
        <span className="font-bold text-black">
          {progress ? `${progress.today_minutes}/${progress.total_goal} minutes` : "N/A"}
        </span>
      </h2>
      <hr className="w-3/4 mx-auto" />
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
      <button
        onClick={handleSettings}
        className="self-center font-semibold underline-offset-[5px] border-b-2 border-blueLotus text-blueLotus hover:opacity-80 active:scale-95 transition-all duration-200 text-sm sm:text-base"
      >
        Settings
      </button>
    </div>
  );
}
