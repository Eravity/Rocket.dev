"use client";

import { memo } from "react";
import { useParams, usePathname } from "next/navigation";
import { useChapterNavigation } from "../_hooks/useChapterNavigation";
import CourseIndicator from "./CourseIndicator";

type CourseNavigationProps = {
  courseSlug: string;
};

function ChapterList({ courseSlug }: CourseNavigationProps) {
  const params = useParams();
  const pathname = usePathname();
  const currentLessonSlug = params.lessonSlug as string;

  // Use the extracted hook for all functionality
  const {
    isLoading,
    filteredItems,
    searchTerm,
    setSearchTerm,
    resetSearch,
    isSearching,
    completedLessons,
    toggleLessonCompletion,
    navigateToLesson,
    overallProgress,
    getChapterProgress
  } = useChapterNavigation(courseSlug, currentLessonSlug);

  if (isLoading) {
    return (
      <div className="p-5 text-center">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">Loading course content...</p>
      </div>
    );
  }
  
  if (!filteredItems.length && !searchTerm && !isSearching) {
    return (
      <div className="bg-white p-4 text-center text-gray-500">
        No course content available
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm">
      <CourseIndicator slug={courseSlug}/>
      <div className="px-5 pt-5 pb-4">
        <h2 className="font-semibold text-lg text-gray-800">Course Content</h2>
        <div className="mt-2 mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Course Progress</span>
            <span>{overallProgress}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${overallProgress}%` }}></div>
          </div>
        </div>
        <div className="relative mt-3">
          <input 
            type="text"
            className="w-full p-2 pl-8 pr-8 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg 
            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchTerm && (
            <button 
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              onClick={resetSearch}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <div className="course-navigation max-h-[calc(100vh-200px)] overflow-y-auto divide-y divide-gray-100">
        {filteredItems.map((chapter, chapterIndex) => {
          const progress = getChapterProgress(chapter);
          
          return (
            <div key={chapter.id || chapterIndex} className="chapter-section">
              <div className="py-3 px-5 bg-gray-50 sticky top-0 z-10">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium text-sm text-gray-700">
                    {chapter.title || "Untitled Chapter"}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {progress.completedCount}/{progress.totalCount} lessons
                  </span>
                </div>
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress.percentage}%` }}></div>
                </div>
              </div>
              
              <ul className="lesson-list">
                {chapter.lessons?.map((lesson, lessonIndex) => {
                  const isActive = lesson.slug === currentLessonSlug;
                  const url = `/learning/course/${courseSlug}/lesson/${lesson.slug}`;
                  const isCurrentPath = pathname === url;
                  const isCompleted = completedLessons.has(lesson.slug);
                  
                  return (
                    <li key={lesson.id || `lesson-${lessonIndex}`}>
                      <div className={`flex items-center py-2.5 px-5 border-l-2 group ${
                        isActive || isCurrentPath ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:bg-gray-50'
                      }`}>
                        {/* Completion checkbox */}
                        <button
                          onClick={(e) => toggleLessonCompletion(e, lesson.slug)}
                          className="mr-3 flex-shrink-0 text-xs bg-gray-100 rounded-full h-5 w-5 flex items-center justify-center hover:bg-gray-200"
                          aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                        >
                          {isCompleted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : isActive ? (
                            <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                          ) : (
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-300 group-hover:bg-gray-400"></div>
                          )}
                        </button>
                        
                        {/* Lesson title */}
                        <a 
                          href={url}
                          onClick={(e) => {
                            if (isCurrentPath || isActive) {
                              e.preventDefault();
                              return;
                            }
                            e.preventDefault();
                            navigateToLesson(lesson.slug);
                          }}
                          className={`text-sm flex-grow text-left ${
                            isCompleted 
                              ? 'text-green-600' 
                              : isActive || isCurrentPath
                                ? 'font-medium text-blue-700' 
                                : 'text-gray-700'
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
          );
        })}
      </div>
      
      {/* Show message when no results match the search */}
      {searchTerm && !filteredItems.length && (
        <div className="p-5 text-center text-gray-500 text-sm">
          No lessons match your search
        </div>
      )}
      
      {/* Searching indicator */}
      {isSearching && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-md text-sm">
          Searching...
        </div>
      )}
    </div>
  );
}

export default memo(ChapterList);