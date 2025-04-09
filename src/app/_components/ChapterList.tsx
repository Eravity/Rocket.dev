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
      {/* Initial styling header before navigation list */}
      <div className="px-5 pt-5 pb-4">
        <h2 className="font-semibold text-lg text-gray-800">Course Content</h2>
        <div className="mt-2 mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Course Progress</span>
            <span>0%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: "0%" }}></div>
          </div>
        </div>
        <div className="relative mt-3">
          <input 
            type="text"
            className="w-full p-2 pl-8 pr-8 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search lessons..."
            readOnly
          />
          <svg 
            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
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