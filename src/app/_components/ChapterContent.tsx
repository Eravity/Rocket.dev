"use client";

import { createContext, useContext } from "react";
import ChapterList from "./ChapterList";
import { useParams } from "next/navigation";
import { useChapterContent } from "../_hooks/useChapterContent";

// Create a context to store course data across navigation
interface NavigationItem {
  id: string;
  title: string;
  slug: string;
  // Add other properties your navigation items have
}

interface CourseDataContextType {
  [courseSlug: string]: NavigationItem[];
}

const CourseDataContext = createContext<CourseDataContextType>({});

// Custom hook to access the course data
export function useCourseData() {
  return useContext(CourseDataContext);
}

export default function ChapterContent({
  className
}: {
  className?: string;
}) {
  const params = useParams();
  const slug = params.slug as string;
  const lessonSlug = params.lessonSlug as string;
  
  // Use our custom hook instead of inline logic
  const { isLoading, navigationItems } = useChapterContent(slug);

  return (
    <aside className={`w-1/4 bg-white ${className}`}>
      <div className="h-full">
        {isLoading ? (
          <div className="p-5 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading course content...</p>
          </div>
        ) : navigationItems.length > 0 ? (
          <ChapterList 
            items={navigationItems} 
            currentLessonSlug={lessonSlug}
            courseSlug={slug}
          />
        ) : (
          <div className="p-5 text-center text-gray-500">
            No chapters available for this course.
          </div>
        )}
      </div>
    </aside>
  );
}