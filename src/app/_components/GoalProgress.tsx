import React from "react";
import InfoSign from "./InfoSign";

export default function GoalProgress({
  total = 100,
  current = 45,
  target = 30,
}) {
  const currentPercent = (current / total) * 100;
  const targetPercent = (target / total) * 100;

  const hatchStart = Math.min(currentPercent, targetPercent);
  const hatchWidth = Math.abs(currentPercent - targetPercent);

  const solidWidth = current > target ? targetPercent : currentPercent;
  const sliderPosition = currentPercent;

  return (
    <div className="border rounded-xl p-4 space-y-4">
      <div className="flex space-x-2">
        <h1 className="text font-semibold">Goal Progress</h1>
        <InfoSign info=""/>
      </div>
      <div
        className={`w-full ${
          current > target ? "bg-green-200" : "bg-red-200"
        } h-2 relative rounded-full`}
      >
        <div
          className={`${
            current > target ? "bg-green-700" : "bg-red-800"
          } rounded-l-full h-full`}
          style={{ width: `${solidWidth}%` }}
        />

        {currentPercent !== targetPercent && (
          <div
            className="absolute h-full top-0 pointer-events-none"
            style={{
              left: `${hatchStart}%`,
              width: `${hatchWidth}%`,
              backgroundImage: `repeating-linear-gradient(-45deg, ${
                current > target ? "#22c55e" : "#f87171"
              } 0, ${
                current > target ? "#22c55e" : "#f87171"
              } 2px, transparent 2px, transparent 4px)`,
            }}
          />
        )}

        <div
          className={`absolute top-1/2 transform -translate-y-1/2 ${
            current > target ? "bg-green-800" : "bg-red-800"
          } border-[4px] border-white rounded-full shadow`}
          style={{
            left: `calc(${sliderPosition}% - 10px)`,
            width: "20px",
            height: "20px",
          }}
        />
      </div>
      <p className="text-neutral-400 text-sm">
        You&apos;re{" "}
        <span
          className={`${
            current > target ? "text-[#22c55e]" : "text-[#ef4444]"
          } font-semibold`}
        >
          {current > target ? "ahead of pace" : "behind pace"}
        </span>{" "}
        and should reach your goal{" "}
        <span className="text-black font-semibold">
          30% {current > target ? "ahead of schedule" : "behind schedule"}
        </span>
      </p>
    </div>
  );
}
