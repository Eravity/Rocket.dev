"use client";
import dynamic from "next/dynamic";
import Rocket from "./Icons/Rocket";
import { useEffect, useState } from "react";

const DynamicChart = dynamic(() => import("./GoalChart"), { ssr: false });

export default function GoalChartWrapper({
  data,
  isActive,
  autoPaused,
}: {
  data: number;
  isActive: boolean;
  autoPaused: boolean;
}) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(isActive);
  }, [isActive]);

  useEffect(() => {
    if (autoPaused) {
      setShouldAnimate(false);
    }
  }, [autoPaused]);

  // New effect to restart animation on resume after pause
  useEffect(() => {
    if (!autoPaused && isActive) {
      setShouldAnimate(true);
    }
  }, [autoPaused, isActive]);

  return (
    <div className="mx-auto relative w-24 h-24">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <DynamicChart data={data} />
        <div className={shouldAnimate ? "animate-pulse" : ""}>
          <Rocket color={shouldAnimate ? "#16a34a" : ""} />
        </div>
      </div>
    </div>
  );
}
