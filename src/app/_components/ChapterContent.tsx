"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Accordion from "./Accordion";
import { useParams } from "next/navigation";

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

export default function ChapterContent({
  className
}: {
  className?: string;
}) {
  const [courseChapters, setCourseChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    async function fetchCourseData() {
      if (!slug) return;
      
      setIsLoading(true);
      try {
        const course = await getCourseBySlug(slug);
        if (course && course.chapters) {
          console.log("Fetched course data:", course);
          setCourseChapters(Array.isArray(course.chapters) ? course.chapters : []);
        } else {
          console.error("No chapters found in course data");
          setCourseChapters([]);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourseData();
  }, [slug]);
  
  const accordionItems = courseChapters.map((chapter) => ({
    id: chapter.id || chapter._id || "defaultId",
    title: chapter.title || "Untitled Chapter",
    content: (
      <div className="px-4">
        {chapter.description && <p className="mb-4">{chapter.description}</p>}
        {chapter.lessons && Array.isArray(chapter.lessons) && chapter.lessons.length > 0 ? (
          <div>
            <ul className="space-y-3">
              {chapter.lessons.map((lesson: Lesson, index: number) => (
                <li
                  key={lesson._key || `lesson-${index}`}
                  className={`pl-2 ${index < (chapter.lessons?.length || 0) - 1 ? "border-b border-gray-300" : ""}`}
                >
                  <Link href={`/learning/course/${slug}/lesson/${typeof lesson.slug === "object" ? lesson.slug.current : lesson.slug}`}>
                    <h1 className="font-medium my-4">{lesson.title || "Untitled Lesson"}</h1>
                  </Link>
                  {lesson.description && <p className="text-sm text-gray-600">{lesson.description}</p>}
                </li>
              ))}
            </ul>
          </div>
        ) : chapter.content ? (
          <div className="mt-3">{chapter.content}</div>
        ) : (
          <p className="text-gray-500 my-4 italic">This chapter has no content yet.</p>
        )}
      </div>
    ),
    chapterId: chapter.id || chapter._id || "defaultChapterId",
    isSanityChapter: true,
    lessonCount: Array.isArray(chapter.lessons) ? chapter.lessons.length : 0,
  }));

  return (
    <aside className={`w-1/4 border-l p-3 ${className}`}>
      <input type="text" className="border flex mx-auto p-2 w-full rounded-lg" placeholder="Search..." />
      <div>
        {isLoading ? (
          <div className="p-4 text-center">Loading chapters...</div>
        ) : accordionItems.length > 0 ? (
          <Accordion items={accordionItems} />
        ) : (
          <div className="p-4 text-center">No chapters available for this course.</div>
        )}
      </div>
    </aside>
  );
}