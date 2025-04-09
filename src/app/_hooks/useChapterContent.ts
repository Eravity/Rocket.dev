'use client';

import { useState, useEffect, useMemo, useRef } from "react";

interface Lesson {
  _id?: string;
  _key?: string;
  title?: string;
  slug?: string | { current: string };
}

interface Chapter {
  _id?: string;
  title?: string;
  lessons?: Lesson[];
}

// Create a module-level cache to store course data between renders and components
const courseCache: Record<string, Chapter[]> = {};

export function useChapterContent(slug: string) {
  const [courseChapters, setCourseChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchController = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!slug) return;

    // Check if we already have the data in cache
    if (courseCache[slug]) {
      setCourseChapters(courseCache[slug]);
      return;
    }

    // Create a new abort controller for this request
    fetchController.current = new AbortController();
    const signal = fetchController.current.signal;

    async function fetchCourseData() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/courses/${slug}`, { signal });
        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }
        const course = await response.json();
        if (course && course.chapters) {
          const chapters = Array.isArray(course.chapters) ? course.chapters : [];
          setCourseChapters(chapters);
          // Store in cache for future use
          courseCache[slug] = chapters;
        }
      } catch (error) {
        // Only log errors that aren't from aborting
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          console.error("Error fetching course data:", error);
          setCourseChapters([]);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourseData();

    return () => {
      // Cancel fetch if component unmounts or slug changes
      if (fetchController.current) {
        fetchController.current.abort();
      }
    };
  }, [slug]);

  // Format data for navigation
  const navigationItems = useMemo(() => {
    return courseChapters.map((chapter) => ({
      id: chapter._id || "defaultId",
      title: chapter.title || "Untitled Chapter",
      lessons: chapter.lessons?.map(lesson => ({
        id: lesson._id || lesson._key || "",
        title: lesson.title || "Untitled",
        slug: typeof lesson.slug === "object" ? lesson.slug.current : lesson.slug || "",
      })) || [],
    }));
  }, [courseChapters]);

  return { isLoading, navigationItems };
}
