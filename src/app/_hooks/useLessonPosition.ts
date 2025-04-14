import { useState, useEffect } from 'react';
import getLesson from "@/sanity/queries/getLesson"; // Still needed to get lesson _id
import { getCourseBySlug } from "@/sanity/queries/getCourses";

// Define types used within the hook
interface Lesson {
  _id: string;
  // Removed title, body etc.
}
interface Chapter {
  _id?: string;
  lessons: Lesson[];
}
interface Course {
  chapters: Chapter[];
}
interface LessonPosition {
  chapterNumber?: number;
  lessonNumberInChapter?: number;
  totalLessonsInChapter?: number;
}

// This hook now focuses *only* on calculating the lesson's position.
export function useLessonPosition(lessonSlug: string | undefined | null, courseSlug: string | undefined | null) {
  // Removed lessonContent state
  const [position, setPosition] = useState<LessonPosition>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when slugs change
    setIsLoading(true);
    setError(null);
    setPosition({});

    if (!lessonSlug || !courseSlug) {
        setIsLoading(false);
        // Avoid setting error if slugs are initially undefined/null during render
        if (lessonSlug !== undefined && courseSlug !== undefined) {
            setError("Lesson slug or course slug is missing.");
        }
        return;
    }

    async function fetchAndCalculatePosition() {
      try {
        const [fetchedLesson, fetchedCourse]: [Lesson | null, Course | null] = await Promise.all([
          getLesson(lessonSlug!), // Fetch lesson primarily to get its _id
          getCourseBySlug(courseSlug!),
        ]);

        // Validate fetched data
        if (!fetchedLesson) {
          throw new Error(`Lesson with slug "${lessonSlug}" not found.`);
        }
        if (!fetchedCourse) {
          throw new Error(`Course with slug "${courseSlug}" not found.`);
        }
        if (!fetchedLesson._id) {
            throw new Error(`Lesson found by slug "${lessonSlug}", but it is missing an '_id'.`);
        }
        // Removed setLessonContent(fetchedLesson);

        // Calculate position using the fetched lesson's ID
        let calculatedPosition: LessonPosition = {};
        const targetLessonId = fetchedLesson._id;

        if (fetchedCourse.chapters && Array.isArray(fetchedCourse.chapters)) {
          fetchedCourse.chapters.find((chapter, chapterIndex) => {
            if (chapter?.lessons && Array.isArray(chapter.lessons)) {
              const lessonIndex = chapter.lessons.findIndex(
                (lesson) => lesson?._id === targetLessonId
              );
              if (lessonIndex !== -1) {
                calculatedPosition = {
                  chapterNumber: chapterIndex + 1,
                  lessonNumberInChapter: lessonIndex + 1,
                  totalLessonsInChapter: chapter.lessons.length,
                };
                return true; // Stop searching
              }
            }
            return false; // Continue searching
          });
        }

        if (calculatedPosition.chapterNumber === undefined) {
            // Warning if position wasn't found, but not necessarily an error
            console.warn(`Lesson ID ${targetLessonId} (slug: ${lessonSlug}) not found in course structure ${courseSlug}.`);
        }
        setPosition(calculatedPosition);

      } catch (err: unknown) {
        console.error("Error in useLessonPosition:", err);
        setError((err instanceof Error) ? err.message : "Failed to calculate lesson position.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchAndCalculatePosition();

  }, [lessonSlug, courseSlug]);

  // Return only position, loading state, and error
  return {
    position,
    isLoading,
    error,
  };
}
