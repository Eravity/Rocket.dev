"use client";

import icons from "./Icons/Icons";
import {useDailyGoal} from "../_hooks/useDailyGoal";
import React from "react";

// Types
interface StatItem {
  icon: React.ComponentType<{ color: string; width: number; height: number }>;
  value: string;
  label: string;
  subtext: string;
  color: "amber" | "purple" | "emerald";
  bgGradient: string;
  iconBg: string;
  iconColor: string;
}

interface StreakData {
  currentStreak: number;
  maxStreak: number;
  description: string;
}

// Constants
const STATS_DATA: StatItem[] = [
  {
    icon: icons.Points,
    value: "3.2k",
    label: "XP Points",
    subtext: "Total earned",
    color: "amber",
    bgGradient: "from-amber-50 to-orange-50",
    iconBg: "bg-amber-100",
    iconColor: "#F59E0B",
  },
  {
    icon: icons.Medal,
    value: "47",
    label: "Achievements",
    subtext: "Badges collected",
    color: "purple",
    bgGradient: "from-purple-50 to-violet-50",
    iconBg: "bg-purple-100",
    iconColor: "#8B5CF6",
  },
  {
    icon: icons.Certificate,
    value: "18",
    label: "Courses",
    subtext: "Total Completed",
    color: "emerald",
    bgGradient: "from-emerald-50 to-green-50",
    iconBg: "bg-emerald-100",
    iconColor: "#10B981",
  },
];

const THEME_COLORS = {
  amber: {
    border: "rgba(251, 191, 36, 0.3)",
    shadow: "rgb(245 158 11 / 0.1)",
  },
  purple: {
    border: "rgba(139, 92, 246, 0.3)",
    shadow: "rgb(139 92 246 / 0.1)",
  },
  emerald: {
    border: "rgb(16, 185, 129, 0.3)",
    shadow: "rgb(16 185 129 / 0.1)",
  },
} as const;

// Helper functions
const getBorderColor = (color: StatItem['color']): string => THEME_COLORS[color].border;
const getShadowColor = (color: StatItem['color']): string => THEME_COLORS[color].shadow;

const handleStatHover = (event: React.MouseEvent<HTMLDivElement>, color: StatItem['color']) => {
  const target = event.currentTarget;
  target.style.boxShadow = `0 25px 50px -12px ${getShadowColor(color)}`;
};

const handleStatLeave = (event: React.MouseEvent<HTMLDivElement>) => {
  event.currentTarget.style.boxShadow = "0 0 0 0 transparent";
};

// Components
const StatCard: React.FC<{ stat: StatItem; index: number }> = ({stat, index}) => (
  <div
    key={index}
    className={`group relative bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-3 lg:p-2.5 xl:p-3 2xl:p-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden w-full h-full lg:h-[133px] xl:w-full xl:h-32 2xl:w-auto 2xl:h-auto`}
    style={{
      borderWidth: "2px",
      borderColor: getBorderColor(stat.color),
      boxShadow: `0 0 0 0 transparent, 0 0 0 0 transparent, var(--tw-shadow, 0 0 #0000)`,
    }}
    onMouseEnter={(e) => handleStatHover(e, stat.color)}
    onMouseLeave={handleStatLeave}
  >
    {/* Decorative blur elements */}
    <div
      className="absolute -top-6 -right-6 w-20 h-20 lg:w-16 lg:h-16 xl:w-14 xl:h-14 2xl:w-20 2xl:h-20 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
    <div
      className="absolute -bottom-4 -left-4 w-16 h-16 lg:w-12 lg:h-12 xl:w-10 xl:h-10 2xl:w-16 2xl:h-16 bg-gradient-to-tr from-white/30 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>

    {/* Content - Mobile horizontal layout, larger screens vertical */}
    <div className="relative z-10 h-full">
      {/* Mobile Layout: All in one row */}
      <div className="flex md:hidden items-center justify-between gap-3">
        <div
          className={`${stat.iconBg} w-8 h-8 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 shrink-0`}
        >
          <stat.icon color={stat.iconColor} width={20} height={20}/>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-800 leading-tight truncate">
            {stat.label}
          </h3>
          <p className="text-xs text-gray-600 truncate">
            {stat.subtext}
          </p>
        </div>
        <div className="text-lg font-bold text-gray-900 group-hover:text-gray-800 transition-colors shrink-0">
          {stat.value}
        </div>
      </div>

      {/* Medium+ Layout: Original vertical layout */}
      <div className="hidden md:flex flex-col h-full">
        {/* Icon and Value Row */}
        <div className="flex items-center justify-between mb-4 lg:mb-3 xl:mb-2 2xl:mb-4">
          <div
            className={`${stat.iconBg} w-8 h-8 lg:w-9 lg:h-9 xl:w-9 xl:h-9 2xl:w-12 2xl:h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 shrink-0`}
          >
            <stat.icon color={stat.iconColor} width={20} height={20}/>
          </div>
          <div className="text-lg sm:text-xl md:text-2xl lg:text-lg xl:text-lg 2xl:text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
            {stat.value}
          </div>
        </div>

        {/* Spacer to push label and subtext to bottom */}
        <div className="flex-1"></div>

        {/* Label and Subtext at bottom */}
        <div className="space-y-1">
          <h3 className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-sm 2xl:text-base font-semibold text-gray-800 leading-tight">
            {stat.label}
          </h3>
          <p className="text-xs 2xl:text-xs text-gray-600">
            {stat.subtext}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const StreakDots: React.FC<{ currentStreak: number; maxStreak: number; className?: string }> = ({
                                                                                                  currentStreak,
                                                                                                  maxStreak,
                                                                                                  className = "w-2 h-2 lg:w-3 lg:h-3"
                                                                                                }) => (
  <div className="flex items-center gap-1 lg:gap-1.5">
    {[...Array(maxStreak)].map((_, i) => (
      <div
        key={i}
        className={`${className} rounded-full transition-all duration-300 group-hover:scale-110 ${
          i < currentStreak
            ? "bg-blue-500 group-hover:bg-blue-600"
            : "bg-gray-300 group-hover:bg-[#c1c5c9]"
        }`}
      />
    ))}
  </div>
);

const LearningStreakCard: React.FC<{
  streakData: StreakData;
  variant: "grid" | "horizontal"
}> = ({streakData, variant}) => {
  const isGrid = variant === "grid";
  const visibilityClass = isGrid
    ? "hidden lg:block xl:block 2xl:hidden"
    : "lg:hidden xl:hidden 2xl:block";

  const containerClass = isGrid
    ? "bg-gradient-to-r from-blue-50/90 to-purple-50/90 rounded-2xl border-2 border-blue-200/60 p-4 lg:p-3 xl:p-3 2xl:p-4 relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md cursor-pointer group w-full h-full xl:w-full xl:h-32 2xl:w-32 2xl:h-36"
    : "bg-gradient-to-r from-blue-50/90 to-purple-50/90 rounded-xl border-2 border-blue-200/60 p-4 2xl:p-5 relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md cursor-pointer group";

  return (
    <div className={`${visibilityClass} ${containerClass}`}>
      {/* Background blur effects */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 right-0 w-16 h-16 lg:w-12 lg:h-12 xl:w-10 xl:h-10 2xl:w-16 2xl:h-16 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-xl opacity-60 group-hover:scale-125 transition-transform duration-500"></div>
        <div
          className="absolute bottom-0 left-0 w-12 h-12 lg:w-8 lg:h-8 xl:w-6 xl:h-6 2xl:w-12 2xl:h-12 bg-gradient-to-tr from-purple-300/15 to-blue-300/15 rounded-full blur-lg opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
      </div>

      {isGrid ? (
        <div className="flex flex-col h-full justify-between relative z-10">
          <div>
            <h4 className="text-sm lg:text-sm xl:text-sm 2xl:text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
              Learning Streak
            </h4>
            <p className="text-xs lg:text-xs xl:text-xs 2xl:text-sm mt-1 lg:mt-1 xl:mt-0.5 2xl:mt-2 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
              {streakData.description}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 lg:gap-2 xl:gap-2 2xl:gap-3">
            <span className="text-lg lg:text-lg xl:text-lg 2xl:text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
              {streakData.currentStreak} days
            </span>
            <StreakDots
              currentStreak={streakData.currentStreak}
              maxStreak={streakData.maxStreak}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between gap-3 relative z-10">
          <div className="flex-1">
            <h4 className="text-lg 2xl:text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
              Learning Streak
            </h4>
            <p className="text-sm 2xl:text-base mt-1 2xl:mt-2 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
              Keep up the amazing progress!
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <span className="text-lg 2xl:text-xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
              {streakData.currentStreak} {streakData.currentStreak === 1 ? "Day" : "Days"}
            </span>
            <StreakDots
              currentStreak={streakData.currentStreak}
              maxStreak={streakData.maxStreak}
              className="w-3 h-3"
            />
          </div>
        </div>
      )}
    </div>
  );
};


export default function Stats() {
  const {displayedProgress} = useDailyGoal();

  // Use real streak data or fallback to default
  const streakData: StreakData = {
    currentStreak: displayedProgress?.streak_days || 0,
    maxStreak: 7, // You can adjust this or make it dynamic
    description: displayedProgress?.streak_days
      ? displayedProgress.streak_days > 3
        ? "Keep it up!"
        : "Great start!"
      : "Start your streak!",
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-2.5 xl:space-y-1 2xl:gap-y-3.5 h-full flex flex-col">
        {/* Main Stats Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-x-3 gap-y-2 sm:gap-y-3 md:gap-y-3 lg:gap-x-3 lg:gap-y-3 xl:gap-x-2.5 xl:gap-y-2.5 2xl:gap-x-4 2xl:gap-y-6 flex-1">
          {STATS_DATA.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index}/>
          ))}

          {/* Learning Streak Section - integrated in grid for lg+ screens */}
          <LearningStreakCard streakData={streakData} variant="grid"/>
        </div>

        {/* Learning Streak Section - separate for small/medium screens and 2xl+ */}
        <div className="flex-shrink-0">
          <LearningStreakCard streakData={streakData} variant="horizontal"/>
        </div>
      </div>
    </div>
  );
}