'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useChapterContent } from './useChapterContent';
import { useDebounceSearch } from './useDebounceSearch';

export function useChapterNavigation(courseSlug: string, currentLessonSlug: string) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, navigationItems: items } = useChapterContent(courseSlug);
  const navigationInProgress = useRef(false);
  
  // Use the debounced search hook
  const { searchTerm, setSearchTerm, debouncedSearchTerm, resetSearch, isSearching } = useDebounceSearch('', 300);
  
  // Completed lessons state
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  
  // Load completed lessons from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCompletedLessons = localStorage.getItem('completedLessons');
      if (savedCompletedLessons) {
        try {
          const parsed = JSON.parse(savedCompletedLessons);
          setCompletedLessons(new Set(parsed));
        } catch (e) {
          console.error('Failed to parse completed lessons:', e);
        }
      }
    }
  }, []);
  
  // Reset navigation lock when pathname changes
  useEffect(() => {
    navigationInProgress.current = false;
  }, [pathname]);
  
  // Function to toggle lesson completion
  const toggleLessonCompletion = useCallback((e: React.MouseEvent, lessonSlug: string) => {
    e.preventDefault();
    e.stopPropagation();
    
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
  
  // Function to navigate to lesson with robust handling
  const navigateToLesson = useCallback((lessonSlug: string) => {
    if (currentLessonSlug === lessonSlug || navigationInProgress.current) {
      return;
    }
    navigationInProgress.current = true;
    const targetUrl = `/learning/course/${courseSlug}/lesson/${lessonSlug}`;
    if (pathname !== targetUrl) {
      router.push(targetUrl, { scroll: false });
    }
  }, [router, courseSlug, currentLessonSlug, pathname]);

  // Filter items based on debounced search term
  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return items;
    
    return items.filter(chapter => {
      // Check if chapter title matches search
      const chapterMatches = chapter.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      // Check if any lessons match search
      const matchingLessons = chapter.lessons?.filter(lesson => 
        lesson.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      
      return chapterMatches || (matchingLessons && matchingLessons.length > 0);
    });
  }, [items, debouncedSearchTerm]);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    // Get all valid lesson slugs from the current course
    const validLessonSlugs = new Set(
      items.flatMap(chapter => 
        chapter.lessons?.map(lesson => lesson.slug) || []
      )
    );

    // Count only completed lessons that exist in this course
    const validCompletedLessons = Array.from(completedLessons)
      .filter(slug => validLessonSlugs.has(slug)).length;

    const totalLessons = items.reduce(
      (total, chapter) => total + (chapter.lessons?.length || 0),
      0
    );

    return totalLessons > 0
      ? Math.min(Math.round((validCompletedLessons / totalLessons) * 100), 100)
      : 0;
  }, [items, completedLessons]);

  // Calculate progress for each chapter
  const getChapterProgress = useCallback((chapter: { lessons?: Array<{ slug: string }> }) => {
    const chapterLessons = chapter.lessons || [];
    const completedInChapter = chapterLessons.filter(lesson => 
      completedLessons.has(lesson.slug)
    ).length;
    return {
      completedCount: completedInChapter,
      totalCount: chapterLessons.length,
      percentage: chapterLessons.length 
        ? Math.round((completedInChapter / chapterLessons.length) * 100) 
        : 0
    };
  }, [completedLessons]);

  return {
    isLoading,
    items,
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
  };
}
