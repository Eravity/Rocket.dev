"use client";

import { createContext, useContext, useMemo, useState, useCallback } from "react";
import ChapterList from "./ChapterList";
import { useParams } from "next/navigation";
import { useChapterContent } from "../_hooks/useChapterContent";
import { memo } from "react";

// Define types clearly
export interface NavigationItem {
  id: string;
  title: string;
  slug?: string;
  chapterId?: number | string;
  isSanityChapter?: boolean;
  lessonCount?: number;
  lessons?: LessonItem[];
}

export interface LessonItem {
  id: string;
  title: string;
  slug: string;
}

// More detailed context type
interface CourseContextType {
  navigationItems: NavigationItem[];
  completedLessons: Set<string>;
  toggleLessonCompletion: (lessonSlug: string) => void;
  currentLessonSlug: string;
  courseSlug: string;
}

const CourseContext = createContext<CourseContextType | null>(null);

// Custom hook with proper type safety
export function useCourseContext() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseContext must be used within a CourseProvider");
  }
  return context;
}

function ChapterContent({ className }: { className?: string }) {
  const params = useParams();
  const courseSlug = params.slug as string;
  const lessonSlug = params.lessonSlug as string;

  // Use our custom hook for fetching data
  const { isLoading, navigationItems } = useChapterContent(courseSlug);
  
  // Move state up to prevent recreation in child components
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    
    try {
      const saved = localStorage.getItem('completedLessons');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (e) {
      console.error('Failed to parse completed lessons:', e);
      return new Set();
    }
  });

  // Create a stable callback function
  const toggleLessonCompletion = useCallback((lessonSlug: string) => {
    setCompletedLessons(prev => {
      const newCompleted = new Set(prev);
      if (newCompleted.has(lessonSlug)) {
        newCompleted.delete(lessonSlug);
      } else {
        newCompleted.add(lessonSlug);
      }
      
      // Save to localStorage
      localStorage.setItem('completedLessons', JSON.stringify([...newCompleted]));
      return newCompleted;
    });
  }, []);

  // Create a stable context value
  const contextValue = useMemo(() => ({
    navigationItems,
    completedLessons,
    toggleLessonCompletion,
    currentLessonSlug: lessonSlug,
    courseSlug
  }), [navigationItems, completedLessons, toggleLessonCompletion, lessonSlug, courseSlug]);
  console.log(navigationItems)

  return (
    <aside className={`w-1/4 bg-white ${className}`}>
      <div className="h-full">
        {isLoading ? (
          <div className="p-5 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading course content...</p>
          </div>
        ) : navigationItems.length > 0 ? (
          <CourseContext.Provider value={contextValue}>
            <ChapterList items={[]} />
          </CourseContext.Provider>
        ) : (
          <div className="p-5 text-center text-gray-500">
            No chapters available for this course.
          </div>
        )}
      </div>
    </aside>
  );
}

export default memo(ChapterContent);