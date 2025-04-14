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

  const { position, isLoading: isPositionLoading, error: positionError } = useLessonPosition(lessonSlug, courseSlug);

  useEffect(() => {
    if (positionError?.includes("not found")) {
        notFound();
    }
  }, [positionError]);

  if (positionError && !positionError.includes("not found")) {
    return <main><div className="flex px-5 py-3 border-b items-center gap-2 text-sm text-red-600">Error loading position: {positionError}</div></main>;
  }

  return (
      <main>
        <Indicator
          isLoading={isPositionLoading} 
          chapterNumber={position.chapterNumber}
          lessonNumberInChapter={position.lessonNumberInChapter}
          totalLessonsInChapter={position.totalLessonsInChapter}
        />
      </main>
  );
}
