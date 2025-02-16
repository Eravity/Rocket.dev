"use client";
import React, { useMemo } from "react";
import Check from "./Icons/Check";
import Rocket from "./Icons/Rocket";
import { Chapter, useChapterProgress } from "../hooks/useChapterProgress";

const Roadmap = React.memo(
  ({ chapters }: { chapters: Chapter[] }) => {
    const totalSteps = chapters.length;
    const { currentChapter } = useChapterProgress(chapters);

    // Compute completion percentage based on chapter id
    const completionPercentage = useMemo(() => {
      if (!totalSteps) return 0;
      const lastId = chapters[totalSteps - 1].id || totalSteps - 1;
      return Math.min(
        100,
        Math.floor((currentChapter.id / lastId) * 100)
      );
    }, [chapters, currentChapter, totalSteps]);

    return (
      <div className="w-full h-full px-4 py-4">
        <div className="relative w-full h-fit">
          {/* Progress bar */}
          <div className="w-full h-3 bg-[#E9F1FC] rounded relative">
            <div
              className="h-3 bg-blueLotus rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          {/* Steps */}
          {chapters.map((chapter, index) => {
            const leftPercent = (index / (totalSteps - 1)) * 100;
            const isCompleted = chapter.completion === 100 || index < currentChapter.id;
            // First & Last based on index
            const isFirst = index === 0;
            const isLast = index === totalSteps - 1;
            // Adjust transform styling
            const transformStyle = isLast
              ? "translate(-50%, -32%)"
              : "translate(-50%, -27%)";

            return (
              <div
                key={chapter.id}
                className="absolute z-10 flex flex-col items-center"
                style={{
                  left: `${leftPercent}%`,
                  top: "50%",
                  transform: transformStyle,
                }}
              >
                <div
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
                </div>
                <div className="mt-2 text-sm font-semibold text-center text-gray-500">
                  <h1 className="font-bold text-black">{chapter.title}</h1>
                  <h1 className="text-xs w-13">{chapter.description || ""}</h1>
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
