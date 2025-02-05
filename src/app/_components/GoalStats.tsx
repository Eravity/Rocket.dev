"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { getLearningProgress } from "../supabase/data-service";

interface LearningProgress {
	today_minutes: number;
	total_goal: number;
	streak_days: number;
	streak_start: string;
	streak_end: string;
	created_at: string;
}

const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = String(date.getFullYear()).slice(-2);
	return `${day}.${month}.${year}`;
};

export default function GoalStats({ onStart, onPause }: { onStart: () => void; onPause: () => void }) {
	const [progress, setProgress] = useState<LearningProgress | null>(null);
	const [loading, setLoading] = useState(true);
	const [isActive, setIsActive] = useState(false);

	// Fetch the latest learning progress from the database
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
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const handleToggle = useCallback(() => {
		if (isActive) {
			onPause();
		} else {
			onStart();
		}
		setIsActive(prev => !prev);
	}, [isActive, onPause, onStart]);

	// Compute accurate streak days from streak_start and streak_end (inclusive)
	const computedStreakDays = useMemo(() => {
		if (progress) {
			const start = new Date(progress.streak_start);
			const end = new Date(progress.streak_end);
			const diffDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
			return diffDays;
		}
		return 0;
	}, [progress]);

	const formattedDates = useMemo(() => {
		if (progress) {
			return `${formatDate(progress.streak_start)} - ${formatDate(progress.streak_end)}`;
		}
		return "";
	}, [progress]);

	return (
		<div className="flex flex-col gap-4">
			{/* Daily Goal Display */}
			<h2 className="text-neutral-400 text-center font-semibold text-sm">
				Daily Goal:{" "}
				<span className="font-bold text-black">
					{loading ? "Loading..." : `${progress?.today_minutes}/${progress?.total_goal} minutes`}
				</span>
			</h2>

			<hr className="w-3/4 mx-auto" />

			{/* Streak Display */}
			<div className="text-center">
				<h2 className="text-neutral-400 font-semibold text-sm">
					Your Longest Streak:{" "}
					<span className="font-bold text-black">
						{loading ? "Loading..." : `${computedStreakDays} ${computedStreakDays === 1 ? "Day" : "Days"}`}
					</span>
				</h2>
				<p className="text-sm font-semibold text-neutral-400">
					({loading ? "Loading dates..." : formattedDates})
				</p>
			</div>

			{/* Single Toggle Button */}
			<button
				onClick={handleToggle}
				className="self-start sm:self-auto w-fit mx-auto font-semibold underline-offset-[5px] border-b-2 border-blueLotus text-blueLotus hover:opacity-80 active:scale-95 transition-all duration-200 text-sm sm:text-base">
				{isActive ? "Pause Learning" : "Start Learning"}
			</button>
		</div>
	);
}
