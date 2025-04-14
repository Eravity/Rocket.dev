'use client';

import { useParams, notFound } from "next/navigation";
import Indicator from "@/app/_components/Indicator";
import { useLessonPosition } from "@/app/_hooks/useLessonPosition";
import { useEffect } from "react";

type PageParams = { articleId: string, slug: string };

export default function LessonPage() {
  const params = useParams<PageParams>();
  const lessonSlug = params?.articleId;
  const courseSlug = params?.slug;

  // Use the hook *only* for position data
  const { position, isLoading: isPositionLoading, error: positionError } = useLessonPosition(lessonSlug, courseSlug);

  // Handle not found error from the position hook
  useEffect(() => {
    if (positionError?.includes("not found")) {
        notFound();
    }
  }, [positionError]);

  // Use only the position loading state
  if (isPositionLoading) {
    return <main><div className="h-10 flex items-center px-5 text-sm text-gray-400">Loading position...</div></main>;
  }

  // Display error state from the position hook (excluding not found)
  if (positionError && !positionError.includes("not found")) {
    return <main><div className="flex px-5 py-3 border-b items-center gap-2 text-sm text-red-600">Error loading position: {positionError}</div></main>;
  }

  // Render only the Indicator
  return (
      <main>
        <Indicator
          chapterNumber={position.chapterNumber}
          lessonNumberInChapter={position.lessonNumberInChapter}
          totalLessonsInChapter={position.totalLessonsInChapter}
        />
      </main>
  );
}
