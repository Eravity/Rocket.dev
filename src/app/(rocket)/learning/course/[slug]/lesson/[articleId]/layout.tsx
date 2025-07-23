"use client";

import {useRef, useCallback} from "react";
import {useParams} from "next/navigation";
import useScrollComplete from "@/app/_hooks/useScrollComplete";
import ChapterContent from "@/app/_components/ChapterContent";

export default function Layout({
                                 children,
                               }: {
  children: React.ReactNode;
  params: Promise<{ slug: string; articleId: string }>;
}) {
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const params = useParams();
  const courseSlug = params.slug as string;
  const lessonSlug = params.articleId as string;

  // This reference will store the function to mark the lesson as complete
  const markAsCompleteRef = useRef<(lessonSlug: string) => void>();

  const handleScrollComplete = useCallback(() => {
    if (lessonSlug && markAsCompleteRef.current) {
      markAsCompleteRef.current(lessonSlug);
    }
  }, [lessonSlug]);

  useScrollComplete(scrollContainerRef, handleScrollComplete);

  return (
    <div className="relative w-full h-[calc(100vh-117px)] overflow-hidden">
      <main
        ref={scrollContainerRef}
        className="overflow-y-auto w-3/4 h-full flex justify-center"
      >
        <div className="max-w-[1000px]">{children}</div>
      </main>
      <aside className="absolute top-0 right-0 w-1/4 max-w-[500px] h-full overflow-y-auto">
        <ChapterContent
          className="w-full h-full border-l"
          markAsCompleteRef={markAsCompleteRef}
        />
      </aside>
    </div>
  );
}
