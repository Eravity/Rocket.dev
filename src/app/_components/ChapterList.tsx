"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

// Types for lesson/article items
type LessonItem = {
  id: string;
  title: string;
  slug: string;
};

type CourseNavigationProps = {
  items: {
    id: string | number;
    title: string;
    chapterId?: number | string; 
    isSanityChapter?: boolean;
    lessonCount?: number;
    lessons?: LessonItem[];
  }[];
  currentLessonSlug?: string;
  courseSlug?: string;
};

export default function ChapterList({
  items,
  currentLessonSlug = '',
  courseSlug = '',
}: CourseNavigationProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const safeItems = useMemo(() => Array.isArray(items) ? items : [], [items]);
  
  // Get current chapter and lesson for better highlighting
  const currentChapterIndex = useMemo(() => {
    if (!currentLessonSlug) return -1;
    return safeItems.findIndex(chapter => 
      chapter.lessons?.some(lesson => lesson.slug === currentLessonSlug)
    );
  }, [safeItems, currentLessonSlug]);
  
  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return safeItems;
    
    return safeItems.filter(item => {
      const matchesChapter = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchingLessons = item.lessons?.filter(lesson => 
        lesson.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // If chapter matches, return whole chapter
      if (matchesChapter) return true;
      
      // If no lessons match, filter out chapter
      if (!matchingLessons?.length) return false;
      
      // Create a copy with only matching lessons
      return true;
    });
  }, [safeItems, searchTerm]);

  // Calculate overall progress (placeholder - would be connected to actual progress data)
  const overallProgress = 0;
  
  if (!safeItems.length) {
    return (
      <div className="bg-white p-4 text-center text-gray-500">
        No course content available
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm">
      {/* Course header with search */}
      <div className="px-5 pt-5 pb-4">
        <h2 className="font-semibold text-lg text-gray-800">Course Content</h2>
        {currentChapterIndex >= 0 && (
          <div className="mt-2 mb-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Course Progress</span>
              <span>{overallProgress}%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${overallProgress}%` }}></div>
            </div>
          </div>
        )}
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
              onClick={() => setSearchTerm("")}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Course navigation */}
      <div className="course-navigation max-h-[calc(100vh-200px)] overflow-y-auto divide-y divide-gray-100">
        {filteredItems.map((chapter, chapterIndex) => {
          const isCurrentChapter = chapterIndex === currentChapterIndex;
          // Calculate chapter progress (placeholder)
          const chapterProgress = 0;
          
          return (
            <div key={chapter.id || chapterIndex} className="chapter-section">
              <div className="py-3 px-5 bg-gray-50 sticky top-0 z-10">
                <div className="flex justify-between items-center mb-1">
                  <h3 className={`font-medium text-sm ${isCurrentChapter ? 'text-blue-700' : 'text-gray-700'}`}>
                    {chapter.title || "Untitled Chapter"}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {chapter.lessonCount || chapter.lessons?.length || 0} lessons
                  </span>
                </div>
                
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${chapterProgress}%` }}></div>
                </div>
              </div>
              
              <ul className="lesson-list">
                {chapter.lessons?.map((lesson, lessonIndex) => {
                  const isCurrentLesson = lesson.slug === currentLessonSlug;
                  
                  return (
                    <li key={lesson.id || `lesson-${lessonIndex}`}>
                      <Link 
                        href={`/learning/course/${courseSlug}/lesson/${lesson.slug}`}
                        className={`flex items-center py-2.5 px-5 border-l-2 group transition-colors ${
                          isCurrentLesson 
                            ? 'border-blue-500 bg-blue-50 hover:bg-blue-100' 
                            : 'border-transparent hover:bg-gray-50'
                        }`}
                      >
                        <div className="mr-3 flex-shrink-0 text-xs bg-gray-100 rounded-full h-5 w-5 flex items-center justify-center">
                          {isCurrentLesson ? (
                            <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                          ) : (
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-300 group-hover:bg-gray-400"></div>
                          )}
                        </div>
                        <span className={`text-sm ${isCurrentLesson ? 'font-medium text-blue-700' : 'text-gray-700'}`}>
                          {lesson.title || "Untitled Lesson"}
                        </span>
                      </Link>
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
    </div>
  );
}
