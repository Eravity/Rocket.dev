'use client';

import { useState, useEffect } from 'react';

type GreetingProps = {
  username?: string;
};

export default function Greeting({ username = "Champion" }: GreetingProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
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
    <div className="group relative w-full">
      {/* Background blur effects */}
      <div className="absolute inset-0 rounded-xl lg:rounded-2xl overflow-hidden">
        <div className="absolute top-4 right-4 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-blue-400/20 via-purple-400/25 to-indigo-400/20 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
        <div className="absolute bottom-4 left-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-tr from-orange-400/25 via-yellow-400/30 to-amber-400/20 rounded-full blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-r from-pink-300/15 to-purple-300/15 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
      </div>
      
      {/* Main greeting card */}
      <div className="relative bg-gradient-to-br from-white via-white to-blue-50/30 rounded-xl lg:rounded-2xl border-2 border-gray-200/80 shadow-sm hover:shadow-lg hover:border-blue-300/50 transition-all duration-300 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] overflow-hidden backdrop-blur-sm">
        
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
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300/40 min-w-0">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-3/4 transition-all duration-500"></div>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-600 whitespace-nowrap flex-shrink-0">
                75% Goal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
