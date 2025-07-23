"use client";

import {useParams, notFound} from "next/navigation";
import Indicator from "@/app/_components/Indicator";
import {useLessonPosition} from "@/app/_hooks/useLessonPosition";
import {useEffect, useState} from "react";
import getLesson from "@/sanity/queries/getLesson";
import ContentDisplay from "@/app/_components/ContentDisplay";
import {PortableTextBlock} from "@portabletext/types";

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
      } catch {
        // Silently handle error
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
    <main className="bg-white min-h-screen">
      <Indicator
        isLoading={isPositionLoading}
        chapterNumber={position.chapterNumber}
        lessonNumberInChapter={position.lessonNumberInChapter}
        totalLessonsInChapter={position.totalLessonsInChapter}
        lessonTitle={targetLessonTitle}
      />

      <div className="container mx-auto pb-8">
        {isLessonLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-pulse text-gray-500">Loading lesson content...</div>
          </div>
        ) : (
          lessonContent && <ContentDisplay data={{content: lessonContent}}/>
        )}
      </div>
    </main>
  );
}
