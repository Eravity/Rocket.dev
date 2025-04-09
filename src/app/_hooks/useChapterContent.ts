'use client';

import { useState, useEffect, useRef, useMemo } from "react";

interface Lesson {
  _id?: string;
  _key?: string;
  title?: string;
  slug?: string | { current: string };
  description?: string;
  content?: string;
}

interface Chapter {
  id?: string;
  _id?: string;
  title?: string;
  description?: string;
  lessons?: Lesson[];
  content?: React.ReactNode;
}

// Global cache for course data
const courseCache: Record<string, Chapter[]> = {};

// This function will be used to fetch course data
async function getCourseBySlug(slug: string) {
  try {
    const response = await fetch(`/api/courses/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch course');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}

export function useChapterContent(slug: string) {
  const [courseChapters, setCourseChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const previousSlugRef = useRef<string | null>(null);
  const hasFetchedRef = useRef<boolean>(false);

  useEffect(() => {
    // Only fetch if we don't have data for this course yet or it's a different course
    if (!slug || (previousSlugRef.current === slug && hasFetchedRef.current)) return;

    async function fetchCourseData() {
      // If we have cached data, use it immediately
      if (courseCache[slug]) {
        setCourseChapters(courseCache[slug]);
        return;
      }
      
      setIsLoading(true);
      try {
        const course = await getCourseBySlug(slug);
        if (course && course.chapters) {
          const chapters = Array.isArray(course.chapters) ? course.chapters : [];
          setCourseChapters(chapters);
          courseCache[slug] = chapters; // Cache the result
        } else {
          console.error("No chapters found in course data");
          setCourseChapters([]);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setIsLoading(false);
        hasFetchedRef.current = true;
        previousSlugRef.current = slug;
      }
    }

    fetchCourseData();
  }, [slug]); // Only re-run effect when the course slug changes

  // Memoize navigationItems to prevent unnecessary re-renders when passing them as props
  const navigationItems = useMemo(() => {
    return courseChapters.map((chapter) => ({
      id: chapter.id || chapter._id || "defaultId",
      title: chapter.title || "Untitled Chapter",
      chapterId: chapter.id || chapter._id || "defaultChapterId",
      isSanityChapter: true,
      lessonCount: Array.isArray(chapter.lessons) ? chapter.lessons.length : 0,
      lessons: chapter.lessons?.map(lesson => ({
        id: lesson._id || lesson._key || "",
        title: lesson.title || "Untitled",
        slug: typeof lesson.slug === "object" ? lesson.slug.current : lesson.slug || "",
      })) || [],
    }));
  }, [courseChapters]); // Only recalculate when courseChapters changes

  return { courseChapters, isLoading, navigationItems };
}
