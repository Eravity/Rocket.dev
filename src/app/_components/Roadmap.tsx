"use client";
import { motion } from "framer-motion";
import React from "react";
import Check from "./Icons/Check";
import Rocket from "./Icons/Rocket";

const steps = [
  { title: "HTML & CSS" },
  { title: "JavaScript" },
  { title: "Tailwind" },
  { title: "TypeScript" },
  { title: "React" },
  { title: "Next.js" },
  { title: "Databases" },
  { title: "Git" },
  { title: "AI" },
];

const Roadmap = React.memo(
  ({ completionPercentage }: { completionPercentage: number }) => {
    const totalSteps = steps.length;
    const completedForRest = Math.floor(
      (completionPercentage / 100) * (totalSteps - 1)
    );
    const currentIndex = 1 + completedForRest;

    return (
      <div className="w-full h-full px-8 py-4">
        <div className="relative w-full h-fit">
          {/* Progress bar */}
          <div className="w-full h-3 bg-[#E9F1FC] rounded relative">
            <motion.div
              className="h-3 bg-blueLotus rounded"
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
                  transform: "translate(-50%, -32%)",
                }}
              >
                <motion.div
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-[5px] transition-all duration-300 ${
                    isFirst || isLast
                      ? "bg-blueLotus border-white shadow-md"
                      : isCompleted
                      ? "bg-white border-blueLotus"
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
                    <Check color={isCompleted ? "#5d4bf3" : "#E9F1FC"} />
                  )}
                </motion.div>
                <div className={`mt-2 text-sm font-semibold text-center ${isCompleted ? "text-[#5d4bf3]" : "text-neutral-500"}`}>
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
