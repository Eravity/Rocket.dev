"use client";
import { useEffect, useState } from "react";
import { getLearningProgress } from "../supabase/data-service";
import GoalHeader from "./GoalHeader";
import GoalChartWrapper from "./GoalChartWrapper";
import GoalStats from "./GoalStats";

// Define interface for progress data (should match what's returned by getLearningProgress)
interface LearningProgress {
	today_minutes: number;
	total_goal: number;
	streak_days: number;
	streak_start: string;
	streak_end: string;
	progress_percentage: number;
	created_at: string;
}

export default function DailyGoal() {
  const [isClientSide, setIsClientSide] = useState(false);
  const [progress, setProgress] = useState<LearningProgress | null>(null);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    setIsClientSide(true);
  }, []);
  
  // Fetch progress data from the database and use the latest record.
  useEffect(() => {
    (async () => {
      try {
        const data: LearningProgress[] = await getLearningProgress();
        if (data?.length) {
          const latest = data.reduce((prev, current) =>
            new Date(current.created_at).getTime() > new Date(prev.created_at).getTime() ? current : prev
          );
          setProgress(latest);
        }
      } catch (error) {
        console.error("Failed to fetch learning progress", error);
      }
    })();
  }, []);

  // Compute progress percentage: either use the value from DB or derive it.
  const progressPercentage = progress
    ? progress.progress_percentage || Math.round((progress.today_minutes / progress.total_goal) * 100)
    : 0;

  const handleStart = () => {
    setIsActive(true);
    // ...additional logic (e.g., updating DB state) can be added here...
  };

  const handlePause = () => {
    setIsActive(false);
    // ...additional logic (e.g., updating DB state) can be added here...
  };

  if (!isClientSide) {
    return (
      <div className="w-full h-fit flex flex-col p-4 border rounded-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-fit flex flex-col p-4 border rounded-xl">
      <GoalHeader />
      <div className="flex flex-col gap-3 mt-6">
        <GoalChartWrapper data={progressPercentage} isActive={isActive} />
        <GoalStats onStart={handleStart} onPause={handlePause} />
      </div>
    </div>
  );
}
