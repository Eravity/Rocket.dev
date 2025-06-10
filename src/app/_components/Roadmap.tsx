"use client";
import React, { useState } from "react";
import Check from "./Icons/Check";
import Rocket from "./Icons/Rocket";
import { Chapter, useChapterProgress } from "../_hooks/useChapterProgress";

const Roadmap: React.FC<{ chapters: Chapter[] }> = ({ chapters }) => {
  const { sortedChapters, overallCompletion } = useChapterProgress(chapters);
  const totalSteps = sortedChapters.length;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full h-full">
      <div className="mx-auto space-y-3 lg:space-y-4">
        {/* Overall Progress Header */}
        <div className="bg-gradient-to-r from-blueLotus to-lightIndigo rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl lg:text-2xl font-bold mb-1 lg:mb-2">Learning Journey</h2>
              <p className="text-blue-100 text-sm lg:text-base">
                {sortedChapters.filter(ch => ch.completion >= 100).length} of {totalSteps} chapters completed
              </p>
            </div>
            <div className="flex items-center gap-3 lg:gap-4 self-start sm:self-center">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">{overallCompletion}%</div>
                <div className="text-xs lg:text-sm text-blue-100">Complete</div>
              </div>
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Rocket width={24} height={24} color="#fff" />
              </div>
            </div>
          </div>
          
          {/* Overall Progress Bar */}
          <div className="mt-4 lg:mt-6 bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${overallCompletion}%` }}
            />
          </div>

          {/* Expand/Collapse Button */}
          <div className="mt-4 lg:mt-6 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 text-sm lg:text-base font-medium backdrop-blur-sm"
            >
              <span>{isExpanded ? 'Hide Details' : 'View Progress Details'}</span>
              <svg 
                className={`w-4 h-4 lg:w-5 lg:h-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Expandable Chapter Cards */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6 pt-2">
            {sortedChapters.map((chapter, index) => {
              const previousChapter = index > 0 ? sortedChapters[index - 1] : null;
              const isCompleted = chapter.completion >= 100;
              const isFirst = index === 0;
              const isLast = index === totalSteps - 1;
              const isAccessible = isFirst || (previousChapter?.completion === 100);

              return (
                <div
                  key={chapter.id}
                  className={`group relative bg-white rounded-lg lg:rounded-xl border-2 p-4 lg:p-6 transition-all duration-300 transform hover:-translate-y-1 ${
                    isCompleted
                      ? "border-green-200 bg-green-50/50 shadow-md"
                      : isAccessible
                      ? "border-blue-200 hover:border-blueLotus hover:shadow-xl cursor-pointer"
                      : "border-gray-200 opacity-60"
                  }`}
                >
                  {/* Chapter Status Icon and Info */}
                  <div className="flex items-start gap-3 lg:gap-4 mb-3 lg:mb-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          isCompleted
                            ? "bg-green-500 border-green-500 text-white"
                            : isAccessible
                            ? "bg-blueLotus border-blueLotus text-white"
                            : "bg-gray-100 border-gray-300 text-gray-400"
                        }`}
                      >
                        {isFirst ? (
                          <Rocket width={16} height={16} color="#fff" />
                        ) : isLast ? (
                          <span className="text-xs lg:text-sm font-bold">🎉</span>
                        ) : isCompleted ? (
                          <Check color="#fff" />
                        ) : (
                          <span className="text-xs lg:text-sm font-bold">{index + 1}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2 mb-1 lg:mb-2">
                        <h3 className="font-bold text-base lg:text-lg text-gray-900 group-hover:text-blueLotus transition-colors leading-tight">
                          {chapter.title}
                        </h3>
                        {isCompleted && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 self-start">
                            Completed
                          </span>
                        )}
                      </div>
                      
                      {chapter.description && (
                        <p className="text-gray-600 text-sm lg:text-base leading-relaxed overflow-hidden"
                           style={{ 
                             display: '-webkit-box',
                             WebkitLineClamp: 2,
                             WebkitBoxOrient: 'vertical' as const
                           }}>
                          {chapter.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Progress Section */}
                  {!isLast && (
                    <div className="space-y-2 lg:space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className={`text-sm font-bold ${
                          isCompleted ? "text-green-600" : "text-blueLotus"
                        }`}>
                          {chapter.completion}%
                        </span>
                      </div>
                      
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-2 lg:h-3">
                          <div
                            className={`h-2 lg:h-3 rounded-full transition-all duration-500 ${
                              isCompleted ? "bg-green-500" : "bg-blueLotus"
                            }`}
                            style={{ width: `${chapter.completion}%` }}
                          />
                        </div>
                        {chapter.completion > 0 && (
                          <div 
                            className="absolute -top-0.5 lg:-top-1 transform -translate-x-1/2"
                            style={{ 
                              left: chapter.completion >= 100 ? '100%' : `${Math.min(chapter.completion, 95)}%`
                            }}
                          >
                            <div className={`w-3 h-3 lg:w-5 lg:h-5 rounded-full border-2 border-white shadow-md ${
                              isCompleted ? "bg-green-500" : "bg-blueLotus"
                            }`} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Completion Badge for Last Chapter */}
                  {isLast && (
                    <div className="mt-3 lg:mt-4 p-3 lg:p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs lg:text-sm">🏆</span>
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 text-sm lg:text-base">Course Completion</div>
                          <div className="text-xs lg:text-sm text-gray-600">Congratulations on your progress!</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Hover Effect Indicator */}
                  {isAccessible && !isCompleted && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blueLotus/5 to-lightIndigo/5 rounded-lg lg:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;