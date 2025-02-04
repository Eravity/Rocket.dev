import React from "react";

export default function GoalProgress({
  total = 100,
  current = 20,
  target = 30,
}) {
  const currentPercent = (current / total) * 100;
  const targetPercent = (target / total) * 100;

  const hatchStart = Math.min(currentPercent, targetPercent);
  const hatchWidth = Math.abs(currentPercent - targetPercent);

  const solidWidth = current > target ? targetPercent : currentPercent;
  const sliderPosition = currentPercent;

  return (
    <div
      className={`w-full ${current > target ? "bg-green-200" : "bg-red-200"} h-3 relative rounded-full`}
    >
      <div
        className={`${current > target ? "bg-green-700" : "bg-red-800"} rounded-l-full h-full`}
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
            } 0, ${current > target ? "#22c55e" : "#f87171"} 2px, transparent 2px, transparent 4px)`,
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
  );
}
