"use client";
import { motion } from "framer-motion";
import React from "react";
import Check from "./Icons/Check";
import Rocket from "./Icons/Rocket";

const steps = [
  { title: "Start" },
  { title: "HTML & CSS" },
  { title: "JavaScript" },
  { title: "React & State" },
  { title: "Next.js & API" },
  { title: "Supabase & SQL" },
  { title: "Finish" },
];

const Roadmap = React.memo(
  ({ completionPercentage }: { completionPercentage: number }) => {
    const totalSteps = steps.length;
    const completedForRest = Math.floor(
      (completionPercentage / 100) * (totalSteps - 1)
    );
    const currentIndex = 1 + completedForRest;

    return (
      <div className="w-full h-full px-4 py-4">
        <div className="relative w-full h-fit">
          {/* Progress bar */}
          <div className="w-full h-3 bg-[#E9F1FC] rounded relative">
            <motion.div
              className="h-3 bg-[#82ca9d] rounded"
              style={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Steps */}
          {steps.map((step, index) => {
            const leftPercent = (index / (totalSteps - 1)) * 100;
            const isCompleted = index < currentIndex;
            const isFirst = step.title === "Start";
            const isLast = step.title === "Finish";

            return (
              <div
                key={index}
                className="absolute z-10 flex flex-col items-center"
                style={{
                  left: `${leftPercent}%`,
                  top: "50%",
                  transform: "translate(-50%, -34%)",
                }}
              >
                <motion.div
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-[5px] transition-all duration-300 ${
                    isFirst || isLast
                      ? "bg-[#82ca9d] border-white shadow-lg"
                      : isCompleted
                      ? "bg-white border-[#82ca9d]"
                      : "bg-white border-[#E9F1FC]"
                  }`}
                >
                  {isFirst ? (
                    <Rocket width={25} height={25} color="#fff" />
                  ) : isLast ? (
                    <span className="text-white font-semibold text-xs">
                      {completionPercentage}%
                    </span>
                  ) : (
                    <Check color={isCompleted ? "#82ca9d" : "#E9F1FC"} />
                  )}
                </motion.div>
                <div className="mt-2 text-sm font-semibold text-center text-gray-600">
                  {step.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

Roadmap.displayName = "Roadmap";
export default Roadmap;
