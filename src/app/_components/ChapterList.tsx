"use client";

import { memo, useCallback, useRef, useEffect } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useChapterContent } from "../_hooks/useChapterContent";

// Types for lesson/article items

type CourseNavigationProps = {
  courseSlug: string;
};

function ChapterList({ courseSlug }: CourseNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLessonSlug = params.lessonSlug as string;
  const { isLoading, navigationItems: items } = useChapterContent(courseSlug);
  const navigationInProgress = useRef(false);
  
  // Reset navigation lock when pathname changes
  useEffect(() => {
    navigationInProgress.current = false;
  }, [pathname]);
  
  // Function to navigate to lesson with more robust handling
  const navigateToLesson = useCallback((lessonSlug: string) => {
    // Don't navigate if it's the current lesson or navigation is in progress
    if (currentLessonSlug === lessonSlug || navigationInProgress.current) {
      return;
    }
    
    // Set navigation lock
    navigationInProgress.current = true;
    
    // Calculate target URL
    const targetUrl = `/learning/course/${courseSlug}/lesson/${lessonSlug}`;
    
    // Only push if it's different from current path
    if (pathname !== targetUrl) {
      router.push(targetUrl, { scroll: false });
    }
  }, [router, courseSlug, currentLessonSlug, pathname]);

  if (isLoading) {
    return (
      <div className="p-5 text-center">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">Loading course content...</p>
      </div>
    );
  }
  
  if (!items.length) {
    return (
      <div className="bg-white p-4 text-center text-gray-500">
        No course content available
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm">
      <div className="px-5 pt-5 pb-4">
        <h2 className="font-semibold text-lg text-gray-800">Course Content</h2>
      </div>
      
      <div className="course-navigation max-h-[calc(100vh-200px)] overflow-y-auto divide-y divide-gray-100">
        {items.map((chapter, chapterIndex) => (
          <div key={chapter.id || chapterIndex} className="chapter-section">
            <div className="py-3 px-5 bg-gray-50 sticky top-0 z-10">
              <h3 className="font-medium text-sm text-gray-700">
                {chapter.title || "Untitled Chapter"}
              </h3>
            </div>
            
            <ul className="lesson-list">
              {chapter.lessons?.map((lesson, lessonIndex) => {
                const isActive = lesson.slug === currentLessonSlug;
                const url = `/learning/course/${courseSlug}/lesson/${lesson.slug}`;
                const isCurrentPath = pathname === url;
                
                return (
                  <li key={lesson.id || `lesson-${lessonIndex}`}>
                    <div className={`flex items-center py-2.5 px-5 border-l-2 ${
                      isActive || isCurrentPath ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:bg-gray-50'
                    }`}>
                      {/* Use a regular anchor tag for better browser handling */}
                      <a 
                        href={url}
                        onClick={(e) => {
                          if (isCurrentPath || navigationInProgress.current) {
                            e.preventDefault();
                            return;
                          }
                          e.preventDefault();
                          navigateToLesson(lesson.slug);
                        }}
                        className={`text-sm flex-grow text-left ${
                          isActive || isCurrentPath ? 'font-medium text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        {lesson.title || "Untitled Lesson"}
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(ChapterList);