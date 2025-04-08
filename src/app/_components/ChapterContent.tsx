"use client";

import { useState, useEffect, useRef, createContext, useContext } from "react";
import ChapterList from "./ChapterList";
import { useParams } from "next/navigation";

// Create a context to store course data across navigation
interface CourseDataContextType {
  [courseSlug: string]: Chapter[];
}

const CourseDataContext = createContext<CourseDataContextType>({});

// Custom hook to access the course data
export function useCourseData() {
  return useContext(CourseDataContext);
}

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

// Global cache for course data
const courseCache: Record<string, Chapter[]> = {};

export default function ChapterContent({
  className
}: {
  className?: string;
}) {
  const [courseChapters, setCourseChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const slug = params.slug as string;
  const lessonSlug = params.lessonSlug as string;
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
  }, [slug]); // Only re-run effect when the course slug changes, not when lesson slug changes
  
  const navigationItems = courseChapters.map((chapter) => ({
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