"use client";
import React from "react";

interface GoalStatsProps {
  progress: {
    streak_start: string;
    streak_end: string;
    today_minutes: number;
    total_goal: number;
  } | null;
  isActive: boolean;
  onSettingsAction: () => void;
}

export default function GoalStats({progress, onSettingsAction}: GoalStatsProps) {
  const handleSettings = () => {
    onSettingsAction();
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-neutral-400 text-center font-semibold text-sm">
        Daily Goal:{" "}
        <span className="font-bold text-black">
          {progress ? `${progress.today_minutes}/${progress.total_goal} minutes` : "N/A"}
        </span>
      </h2>
      <button
        onClick={handleSettings}
        className=
          "self-center font-semibold underline-offset-[5px] border-b-2 border-blueLotus text-blueLotus hover:opacity-80 active:scale-95 transition-all duration-200 text-sm sm:text-base"
      >
        Settings
      </button>
    </div>
  );
}
