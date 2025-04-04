import { NextResponse } from "next/server";
import { getCourseBySlug } from "@/sanity/queries/getCourses";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const course = await getCourseBySlug(slug);
    
    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }
    interface Lesson {
      _id: string;
      _key?: string;
      title?: string;
      description?: string;
      content?: string;
      slug?: { current: string };
    }
    
    // Process chapters similar to page.tsx
    const courseChapters = [];
    if (Array.isArray(course.chapters)) {
      let chapterIndex = 0;
      for (const chapter of course.chapters) {
        const lessons = Array.isArray(chapter.lessons)
          ? chapter.lessons.map((lesson: Lesson, lessonIndex: number) => ({
              _key: lesson._key || `lesson-${lessonIndex}`,
              title: lesson.title || "Untitled Lesson",
              description: lesson.description || "",
              content: lesson.content || "",
              _id: lesson._id,
              slug: lesson.slug?.current || `lesson-${lessonIndex}`,
            }))
          : [];
          
        courseChapters.push({
          _id: chapter._id || `chapter-${chapterIndex}`,
          id: chapter._id || `chapter-${chapterIndex}`,
          title: chapter.title || "Untitled Chapter",
          description: chapter.description || "",
          isSanityChapter: true,
          content: chapter.content || "",
          lessons: lessons,
        });
        chapterIndex++;
      }
    }

    const serializedCourse = {
      _id: course._id || "",
      id: course._id || "",
      title: course.title || "Untitled Course",
      description: course.description || "",
      chapters: courseChapters,
      slug: course.slug?.current || slug,
    };

    return NextResponse.json(serializedCourse);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch course data" },
      { status: 500 }
    );
  }
}
