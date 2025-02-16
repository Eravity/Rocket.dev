import { useMemo } from "react";

export interface Chapter {
  id: number;
  completion: number; 
  title: string;
  description: string;
}

export function useChapterProgress(chapters: Chapter[]) {
  // Sort chapters by ID
  const sortedChapters = useMemo(() => {
    return [...chapters].sort((a, b) => a.id - b.id);
  }, [chapters]);

  // Compute average progress or any other desired metric
  const overallCompletion = useMemo(() => {
    if (!sortedChapters.length) return 0;
    // Each chapter contributes (completion / 100) to a total fractional amount
    const sumFraction = sortedChapters.reduce(
      (acc, ch) => acc + ch.completion / 100,
      0
    );
    // Convert fractional to a percentage based on total chapters
    return Math.floor((sumFraction / sortedChapters.length) * 100);
  }, [sortedChapters]);

  // Return the sorted chapters and the overall completion metric
  return { sortedChapters, overallCompletion };
}
