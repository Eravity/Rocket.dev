"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Chapter, useChapterProgress } from "../_hooks/useChapterProgress";

type GreetingProps = {
  username?: string;
  chapters?: Chapter[];
  isConstrained?: boolean;
  expandableOnly?: boolean;
  isExpanded?: boolean;
  setIsExpanded?: Dispatch<SetStateAction<boolean>>;
};

export default function Greeting({
  username = "Champion",
  chapters = [],
  isConstrained = false,
  expandableOnly = false,
  isExpanded: isExpandedProp,
  setIsExpanded: setIsExpandedProp,
}: GreetingProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded =
    isExpandedProp !== undefined ? isExpandedProp : internalExpanded;
  const setIsExpanded =
    setIsExpandedProp !== undefined ? setIsExpandedProp : setInternalExpanded;
  const { sortedChapters, overallCompletion } = useChapterProgress(chapters);
  const totalSteps = sortedChapters.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const hour = currentTime.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const formatTime = () => {
    return currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="group relative w-full h-full flex flex-col">
      {/* Background blur effects */}
      <div className="absolute inset-0 rounded-xl lg:rounded-2xl overflow-hidden">
        <div className="absolute top-4 right-4 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-violet-400/15 via-purple-400/20 to-indigo-400/15 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-r from-pink-300/10 to-purple-300/10 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
      </div>

      {/* Main greeting card */}
      {!expandableOnly && (
        <div className="relative bg-white rounded-xl lg:rounded-2xl border-2 shadow-sm hover:shadow-md border-violet-300/40 transition-all duration-300 p-4 sm:p-4 md:p-4 lg:p-5 xl:p-6 flex-1 min-h-0 overflow-hidden">
          <div className="relative z-10 h-full gap-4 flex flex-col justify-between">
            <div className="flex items-center mb-1 justify-between">
              {/* Time and date badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-50/90 to-purple-50/90 backdrop-blur-sm rounded-xl px-2.5 sm:px-3 py-1.5 border border-blue-200/60 self-start relative overflow-hidden">
                {/* Background blur effects */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-sm opacity-60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 bg-gradient-to-tr from-purple-300/15 to-blue-300/15 rounded-full blur-sm opacity-50"></div>
                </div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse relative z-10"></div>
                <span className="text-xs flex sm:text-sm font-medium text-gray-700 gap-2 whitespace-nowrap relative z-10">
                  <span className="hidden sm:flex">{formatTime()}</span>{" "}
                  <span className="hidden sm:flex">•</span> {formatDate()}
                </span>
              </div>

              {/* View Progress Details Button */}
              {totalSteps > 0 && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50/90 to-purple-50/90 hover:from-blue-100/90 hover:to-purple-100/90 rounded-xl transition-all duration-300 hover:shadow-md text-xs sm:text-sm font-medium backdrop-blur-sm border border-blue-200/60 hover:border-blue-300/60 relative overflow-hidden"
                  >
                    {/* Background blur effects */}
                    <div className="absolute inset-0">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-sm opacity-60"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 bg-gradient-to-tr from-purple-300/15 to-blue-300/15 rounded-full blur-sm opacity-50"></div>
                    </div>
                    <span className="relative z-10">
                      {isExpanded ? "Hide Details" : "View Details"}
                    </span>
                    <svg
                      className={`w-3 h-3 sm:w-4 sm:h-4 transform transition-transform duration-300 relative z-10 ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Main greeting */}
            <div className="flex-1 flex flex-col justify-center space-y-1 sm:space-y-2 md:space-y-3">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black">
                <span className="block sm:inline">{greeting},</span>
                <span className="block sm:inline"> {username}</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed line-clamp-2">
                Ready to continue your learning journey? Let&apos;s make today
                productive!
              </p>
            </div>

            {/* Progress indicator */}
            <div className="mt-3">
              <div className="flex flex-col items-center gap-4">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300/30">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${overallCompletion}%` }}
                  ></div>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-600 text-center">
                  <span className="text-violet-500 font-bold">
                    {overallCompletion}%
                  </span>{" "}
                  Complete
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expandable Chapter Cards */}
      {!isConstrained && totalSteps > 0 && (
        <div
          className={`transition-[max-height] ease-in-out duration-500 ${
            isExpanded ? "max-h-[2000px]" : "max-h-0"
          }`}
        >
          <div
            className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-2 sm:gap-3 md:gap-3 lg:gap-6 pt-3 md:pt-4 lg:pt-6 transition-opacity duration-300 ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            {sortedChapters.map((chapter, index) => {
              const previousChapter =
                index > 0 ? sortedChapters[index - 1] : null;
              const isCompleted = chapter.completion >= 100;
              const isFirst = index === 0;
              const isLast = index === totalSteps - 1;
              const isAccessible =
                isFirst || previousChapter?.completion === 100;

              return (
                <div
                  key={chapter.id}
                  className={`relative overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isCompleted
                      ? "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 shadow-md ring-2 ring-emerald-200/60"
                      : isAccessible
                        ? "bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 hover:shadow-md cursor-pointer ring-2 ring-violet-200/60 hover:ring-violet-400/60"
                        : "bg-gradient-to-br from-gray-50 to-gray-100 opacity-70 ring-2 ring-gray-200/60"
                  }`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-25">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/30 to-transparent rounded-full -translate-y-8 translate-x-8" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/25 to-transparent rounded-full translate-y-6 -translate-x-6" />
                  </div>

                  {/* Main Content */}
                  <div className="relative p-4">
                    {/* Title row with number and completion badge */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {/* Chapter Number */}
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold ${
                            isCompleted
                              ? "bg-emerald-500/80 text-white"
                              : isAccessible
                                ? "bg-violet-500/80 text-white"
                                : "bg-gray-400/80 text-white"
                          }`}
                        >
                          {index + 1}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 leading-tight truncate">
                          {chapter.title}
                        </h3>
                      </div>

                      {/* Completion Badge */}
                      {isCompleted && (
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-100/80 text-emerald-700 rounded-full text-xs font-semibold">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                          Complete
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-1">
                      {/* Description */}
                      {chapter.description && (
                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-2">
                          {chapter.description}
                        </p>
                      )}

                      {/* Progress Section */}
                      {!isLast ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                              Progress
                            </span>
                            <div
                              className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                isCompleted
                                  ? "bg-emerald-100/80 text-emerald-700"
                                  : "bg-violet-100/80 text-violet-700"
                              }`}
                            >
                              {chapter.completion}%
                            </div>
                          </div>

                          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-out ${
                                isCompleted
                                  ? "bg-gradient-to-r from-emerald-400/80 to-green-500/80"
                                  : "bg-gradient-to-r from-violet-400/80 to-indigo-500/80"
                              }`}
                              style={{ width: `${chapter.completion}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-amber-50/80 to-orange-50/80 rounded-lg border border-amber-200/60">
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-400/80 to-orange-500/80 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm">🏆</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-gray-900 text-sm">
                              Journey Complete
                            </div>
                            <div className="text-gray-600 text-xs">
                              Course mastered!
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Interactive Glow Effect */}
                  {isAccessible && !isCompleted && (
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-400/0 via-indigo-400/0 to-purple-400/0 group-hover:from-violet-400/3 group-hover:via-indigo-400/3 group-hover:to-purple-400/3 rounded-xl transition-all duration-300" />
                  )}

                  {/* Status Indicator Bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 ${
                      isCompleted
                        ? "bg-gradient-to-r from-emerald-400/80 to-green-500/80"
                        : isAccessible
                          ? "bg-gradient-to-r from-violet-400/80 to-indigo-500/80"
                          : "bg-gray-300/80"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
