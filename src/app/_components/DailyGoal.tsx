"use client";

import dynamic from "next/dynamic";
import InfoSign from "./InfoSign";
import Rocket from "./Icons/Rocket";

const DynamicChart = dynamic(() => import("./GoalChart"), {
  ssr: false,
});

type DailyGoalProps = {
  data: number;
  currentProgress?: number;
  totalGoal?: number;
  longestStreak?: {
    days: number;
    startDate: string;
    endDate: string;
  };
};

const GoalHeader = () => (
  <div className="flex gap-2">
    <h1 className="font-bold">Goals</h1>
    <InfoSign info="Here you can see the progress of your daily goals" />
  </div>
);

const GoalChart = ({ data }: { data: number }) => (
  <div className="mx-auto relative w-24 h-24">
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <DynamicChart data={data} />
      <Rocket />
    </div>
  </div>
);

const GoalStats = ({
  current = 6,
  total = 30,
  streak = { days: 1, startDate: "28 Sep 25", endDate: "4 Oct 25" },
}: {
  current?: number;
  total?: number;
  streak?: { days: number; startDate: string; endDate: string };
}) => (
  <div className="flex flex-col gap-4">
    <h2 className="text-neutral-400 text-center font-semibold text-sm">
      Daily Goal:{" "}
      <span className="font-bold text-black">
        {current}/{total} learning
      </span>
    </h2>

    <hr className="w-3/4 mx-auto" />

    <div className="text-center">
      <h2 className="text-neutral-400 font-semibold text-sm">
        Your Longest Streak:{" "}
        <span className="font-bold text-black">{streak.days} Day</span>
      </h2>
      <p className="text-sm text-neutral-400">
        ({streak.startDate} - {streak.endDate})
      </p>
    </div>

    <button
      className="self-start sm:self-auto w-fit mx-auto font-semibold underline-offset-[5px] 
                 border-b-2 border-blueLotus text-blueLotus hover:opacity-80 active:scale-95 
                 transition-all duration-200 text-sm sm:text-base"
    >
      See Details
    </button>
  </div>
);

export default function DailyGoal({
  data,
  currentProgress = 6,
  totalGoal = 30,
  longestStreak = { days: 1, startDate: "28 Sep 25", endDate: "4 Oct 25" },
}: DailyGoalProps) {
  const validatedData = Math.max(0, Math.min(100, data));

  return (
    <div className="w-full h-fit flex flex-col p-4 border rounded-xl">
      <GoalHeader />
      <div className="flex flex-col gap-3 mt-6">
        <GoalChart data={validatedData} />
        <GoalStats
          current={currentProgress}
          total={totalGoal}
          streak={longestStreak}
        />
      </div>
    </div>
  );
}
