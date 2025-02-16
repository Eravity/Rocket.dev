import { useMemo } from "react";

export interface Chapter {
  id: number;
  completion: number; 
  title: string;
  description: string;
}

export function useChapterProgress(chapters: Chapter[]) {
  // Ensure chapters are sorted by id in ascending order
  const sortedChapters = useMemo(
    () => [...chapters].sort((a, b) => a.id - b.id),
    [chapters]
  );

  // Find the first chapter that is not completely finished
  const currentChapter = useMemo(() => {
    const index = sortedChapters.findIndex((chapter) => chapter.completion < 100);
    return index === -1 ? sortedChapters[sortedChapters.length - 1] : sortedChapters[index];
  }, [sortedChapters]);

  return { currentChapter };
}
