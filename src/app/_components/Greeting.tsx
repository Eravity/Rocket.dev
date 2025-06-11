'use client';

import { useState, useEffect } from 'react';
import Check from "./Icons/Check";
import Rocket from "./Icons/Rocket";
import { Chapter, useChapterProgress } from "../_hooks/useChapterProgress";

type GreetingProps = {
  username?: string;
  chapters?: Chapter[];
};

export default function Greeting({ username = "Champion", chapters = [] }: GreetingProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);
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
  
  const getGreetingEmoji = () => {
    if (hour < 12) return "🌅";
    if (hour < 18) return "☀️";
    return "🌙";
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };
  return (
    <div className="group relative w-full h-full flex flex-col">
      {/* Background blur effects */}
      <div className="absolute inset-0 rounded-xl lg:rounded-2xl overflow-hidden">
        <div className="absolute top-4 right-4 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-blue-400/20 via-purple-400/25 to-indigo-400/20 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
        <div className="absolute bottom-4 left-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-tr from-orange-400/25 via-yellow-400/30 to-amber-400/20 rounded-full blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-r from-pink-300/15 to-purple-300/15 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
      </div>
      
      {/* Main greeting card */}
      <div className="relative bg-gradient-to-br from-white via-white to-blue-50/30 rounded-xl lg:rounded-2xl border-2 border-gray-200/80 shadow-sm hover:shadow-lg hover:border-blue-300/50 transition-all duration-300 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 flex-1 min-h-0 overflow-hidden backdrop-blur-sm">
        
        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Time and date badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gray-100/90 backdrop-blur-sm rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 border border-gray-300/60 self-start">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
              {formatTime()} • {formatDate()}
            </span>
          </div>

          {/* Main greeting */}
          <div className="flex-1 flex flex-col justify-center space-y-1 sm:space-y-2 md:space-y-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent leading-tight truncate">
              <span className="block sm:inline">{greeting},</span>
              <span className="block sm:inline"> {username}</span>
              <span className="inline-block ml-1.5 sm:ml-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl animate-bounce">
                {getGreetingEmoji()}
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed line-clamp-2">
              Ready to continue your learning journey? Let&apos;s make today productive!
            </p>
          </div>

          {/* Progress indicator */}
          <div className="mt-auto">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300/40 min-w-0">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500" 
                     style={{ width: `${overallCompletion}%` }}></div>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-600 whitespace-nowrap flex-shrink-0">
                {overallCompletion}% Complete
              </span>
            </div>
            
            {/* View Progress Details Button */}
            {totalSteps > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100/90 hover:bg-gray-200/90 rounded-full transition-all duration-300 text-xs sm:text-sm font-medium backdrop-blur-sm border border-gray-300/60"
                >
                  <span>{isExpanded ? 'Hide Details' : 'View Progress Details'}</span>
                  <svg 
                    className={`w-3 h-3 sm:w-4 sm:h-4 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Expandable Chapter Cards */}
      {totalSteps > 0 && (
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
                      ? "border-blue-200 hover:border-blue-400 hover:shadow-xl cursor-pointer"
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
                            ? "bg-blue-500 border-blue-500 text-white"
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
                        <h3 className="font-bold text-base lg:text-lg text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
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
                          isCompleted ? "text-green-600" : "text-blue-600"
                        }`}>
                          {chapter.completion}%
                        </span>
                      </div>
                      
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-2 lg:h-3">
                          <div
                            className={`h-2 lg:h-3 rounded-full transition-all duration-500 ${
                              isCompleted ? "bg-green-500" : "bg-blue-500"
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
                              isCompleted ? "bg-green-500" : "bg-blue-500"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg lg:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
