"use client";

import { useParams, notFound } from "next/navigation";
import Indicator from "@/app/_components/Indicator";
import { useLessonPosition } from "@/app/_hooks/useLessonPosition";
import { useEffect, useState } from "react";
import getLesson from "@/sanity/queries/getLesson";
import ContentDisplay from "@/app/_components/ContentDisplay";
import { PortableTextBlock } from "@portabletext/types";

type PageParams = { articleId: string; slug: string };

export default function LessonPage() {
  const params = useParams<PageParams>();
  const lessonSlug = params?.articleId;
  const courseSlug = params?.slug;

  const {
    position,
    isLoading: isPositionLoading,
    error: positionError,
    targetLessonTitle,
  } = useLessonPosition(lessonSlug, courseSlug);

  useEffect(() => {
    if (positionError?.includes("not found")) {
      notFound();
    }
  }, [positionError]);
  
  const [lessonContent, setLessonContent] = useState<PortableTextBlock | PortableTextBlock[]>();
  const [isLessonLoading, setIsLessonLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!lessonSlug) return;

      try {
        setIsLessonLoading(true);
        const lesson = await getLesson(lessonSlug);

        if (!lesson) {
          notFound();
        }

        setLessonContent(lesson.content);
      } catch (error) {
        console.error("Error fetching lesson:", error);
      } finally {
        setIsLessonLoading(false);
      }
    };

    fetchLesson();
  }, [lessonSlug]);

  if (positionError) {
    return (
      <main>
        <div className="flex px-5 py-3 border-b items-center gap-2 text-sm text-red-600">
          Error loading position: {positionError}
        </div>
      </main>
    );
  }

  return (
    <main className="px-1">
      <Indicator
        isLoading={isPositionLoading}
        chapterNumber={position.chapterNumber}
        lessonNumberInChapter={position.lessonNumberInChapter}
        totalLessonsInChapter={position.totalLessonsInChapter}
        lessonTitle={targetLessonTitle}
      />

      <div className="lesson-content">
        {isLessonLoading
          ? "Loading lesson..."
          : lessonContent && <ContentDisplay data={{ content: lessonContent }} />}
      </div>
    </main>
  );
}
