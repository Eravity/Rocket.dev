"use client";
import { motion } from "framer-motion";
import React from "react";
import Check from "./Icons/Check";
import Rocket from "./Icons/Rocket";

const steps = [
  { title: "Web Foundations", description: "HTML & CSS Foundations" },
  {
    title: "Interactive Coding",
    description: "JavaScript & TypeScript Essentials",
  },
  { title: "Version Control", description: "Git & Version Control" },
  { title: "Data & APIs", description: "Databases & API Integration" },
  { title: "Modern UI", description: "Building UI with React" },
  { title: "Full-Stack Mastery", description: "Full-Stack with Next.js" },
  { title: "Automation & AI", description: "AI & Automation in Web" },
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
              className="h-3 bg-blueLotus rounded-full"
              style={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Steps */}
          {steps.map((step, index) => {
            const leftPercent = (index / (totalSteps - 1)) * 100;
            const isCompleted = index < currentIndex;
            // Set first and last conditions based on index
            const isFirst = index === 0;
            const isLast = index === totalSteps - 1;
            // Adjust transform for the last step to compensate for a two-row description
            const transformStyle =
              isLast ? "translate(-50%, -25%)" : "translate(-50%, -32%)";

            return (
              <div
                key={index}
                className="absolute z-10 flex flex-col items-center"
                style={{
                  left: `${leftPercent}%`,
                  top: "50%",
                  transform: transformStyle,
                }}
              >
                <motion.div
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-[5px] transition-all duration-300 ${
                    isFirst || isLast
                      ? "bg-blueLotus border-white shadow-lg"
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
                <div className="mt-2 text-sm font-semibold text-center text-gray-600">
                  <h1 className="">{step.title}</h1>
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
