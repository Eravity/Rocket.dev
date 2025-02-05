
"use client";

export default function GoalStats({
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
}) {
  return (
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
        {isActive
          ? "Pause Learning"
          : hasStartedToday
          ? "Continue Learning"
          : "Start Learning"}
      </button>
    </div>
  );
}