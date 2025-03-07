"use client";
import React from "react";
import Check from "./Icons/Check";
import Rocket from "./Icons/Rocket";
import { Chapter, useChapterProgress } from "../_hooks/useChapterProgress";

const Roadmap = React.memo(
  ({ chapters }: { chapters: Chapter[] }) => {
    const { sortedChapters, overallCompletion } = useChapterProgress(chapters);
    const totalSteps = sortedChapters.length;

    return (
      <div className="w-full h-full px-4 py-4">
        <div className="relative w-full h-fit">
          {/* Segmented progress bar */}
          <div className="w-full h-3 rounded flex relative">
            {Array.from({ length: 8 }).map((_, index) => (
              <div 
                key={`progress-${index}`} 
                className="h-full first:rounded-l last:rounded-r absolute"
                style={{ 
                  backgroundColor: sortedChapters[index]?.completion >= 100 ? '#5d4bf3' : '#E9F1FC',
                  width: '13%',  // Slightly wider than 12.5% (100/8)
                  left: `${(index * 12.5)}%`, // Position based on 8 segments
                }}
              >
                {sortedChapters[index]?.completion < 100 && (
                  <div 
                    className="h-full bg-blueLotus rounded transition-all duration-300"
                    style={{ width: `${sortedChapters[index]?.completion || 0}%` }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Steps circles */}
          {sortedChapters.map((chapter, index) => {
            const previousChapter = index > 0 ? sortedChapters[index - 1] : null;
            const shouldColorCircle = previousChapter?.completion === 100;
            const isCompleted = chapter.completion >= 100;
            const isFirst = index === 0;
            const isLast = index === totalSteps - 1;
            const leftPercent = (index / (totalSteps - 1)) * 100;
            const transformStyle = !isLast ? "translate(-50%, -23%)" : "translate(-50%, -25%)";

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
                      : isCompleted || shouldColorCircle
                      ? "bg-[#fff] border-[#5d4bf3]"
                      : "bg-white border-[#E9F1FC]"
                  }`}
                >
                  {isFirst ? (
                    <Rocket width={25} height={25} color="#fff" />
                  ) : isLast ? (
                    <span className="text-white font-semibold text-xs">
                      {overallCompletion}%
                    </span>
                  ) : (
                    <Check color={(isCompleted || shouldColorCircle) ? "#5d4bf3" : "#E9F1FC"} />
                  )}
                </div>
                <div className="mt-2 text-sm font-semibold text-center text-gray-500">
                  <h1 className="font-bold text-black">{chapter.title}</h1>
                  <h1 className="text-xs w-13">{chapter.description || ""}</h1>
                  <h1 className="text-xs mt-1">
                    {!isLast ? `Progress: ${chapter.completion}%` : ""}
                  </h1>
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
