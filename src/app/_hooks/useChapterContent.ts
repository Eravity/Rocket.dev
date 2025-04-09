'use client';

import { useState, useEffect, useMemo } from "react";

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

export function useChapterContent(slug: string) {
  const [courseChapters, setCourseChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function fetchCourseData() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/courses/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }
        const course = await response.json();
        if (course && course.chapters) {
          setCourseChapters(Array.isArray(course.chapters) ? course.chapters : []);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        setCourseChapters([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourseData();
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
