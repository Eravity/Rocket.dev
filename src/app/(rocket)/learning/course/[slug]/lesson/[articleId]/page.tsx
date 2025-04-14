import getLesson from "@/sanity/queries/getLesson";
import { getCourseBySlug } from "@/sanity/queries/getCourses"; // Import getCourseBySlug
import { notFound } from "next/navigation";
import Indicator from "@/app/_components/Indicator";
import { PortableText } from '@portabletext/react'; // Import PortableText if body is Portable Text

// Define basic types matching getCourseBySlug structure (adjust as needed)
interface Lesson {
  _id: string;
  title?: string; // Add title property
  body?: any; // Add body property (type depends on your Sanity schema, 'any' for flexibility)
  // ... other lesson properties
}
interface Chapter {
  lessons: Lesson[];
  // ... other chapter properties
}
interface Course {
  chapters: Chapter[];
  // ... other course properties
}

// Define a more specific type for the lesson content fetched by getLesson
interface LessonContent extends Lesson {
  // Add any other specific fields returned by getLesson
}

type PageParams = { articleId: string, slug: string }; // articleId here is actually the lesson slug

type Props = {
  params: Promise<PageParams>;
};

export default async function LessonPage({ params }: Props) {
  const { articleId: lessonSlug, slug: courseSlug } = await params; // Rename for clarity

  // Fetch the specific lesson content using its slug
  const lessonContent: LessonContent | null = await getLesson(lessonSlug);
  // Fetch the full course structure
  const courseData: Course | null = await getCourseBySlug(courseSlug);

  // Check if both lesson content (which contains the _id we need) and course data were fetched
  if (!lessonContent || !courseData) {
    console.error("Data fetching failed:", { hasLessonContent: !!lessonContent, hasCourseData: !!courseData });
    notFound(); // Lesson or course not found
  }

  // --- Crucial Check: Ensure we have the lesson's _id before searching ---
  if (!lessonContent._id) {
    console.error(`Lesson found by slug "${lessonSlug}", but it is missing an '_id'. Cannot determine position.`);
  }

  let chapterNumber: number | undefined;
  let lessonNumberInChapter: number | undefined;
  let totalLessonsInChapter: number | undefined;

  // Only search if we have the lesson's actual ID
  const targetLessonId = lessonContent._id; // Get the actual ID to search for

  if (targetLessonId && courseData && Array.isArray(courseData.chapters)) {
    console.log("-----------------------------------------");
    console.log("Attempting to find lesson position...");
    console.log("Course Slug:", courseSlug);
    console.log("Lesson Slug (from URL):", lessonSlug);
    console.log("Searching for Lesson ID:", targetLessonId); // Log the ID we are using for search
    console.log("Course Data Structure (first chapter example):", JSON.stringify(courseData.chapters?.[0], null, 2));
    console.log("Total chapters found:", courseData.chapters.length);
    console.log("-----------------------------------------");

    console.log("Starting search for lesson position...");
    courseData.chapters.find((chapter, chapterIndex) => {
      console.log(`Checking Chapter Index: ${chapterIndex}`);
      if (chapter && Array.isArray(chapter.lessons)) {
        console.log(`  - Chapter has ${chapter.lessons.length} lessons.`);
        const lessonIndex = chapter.lessons.findIndex((lesson, index) => {
          console.log(`  - Checking Lesson Index: ${index}, Lesson ID: ${lesson?._id}, Target ID: ${targetLessonId}`);
          return lesson && lesson._id === targetLessonId; // Compare IDs
        });
        if (lessonIndex !== -1) {
          console.log(`  - Found Lesson at Chapter Index: ${chapterIndex}, Lesson Index: ${lessonIndex}`);
          chapterNumber = chapterIndex + 1;
          lessonNumberInChapter = lessonIndex + 1;
          totalLessonsInChapter = chapter.lessons.length;
          return true; // Stop searching
        }
      } else {
         console.log(`  - Chapter ${chapterIndex} has no lessons array or is invalid.`);
      }
      return false; // Continue searching
    });
    console.log("Finished search.");
  } else if (!targetLessonId) {
      console.warn(`Could not start search because targetLessonId is missing for lesson slug: ${lessonSlug}`);
  } else {
    console.warn("Course data is missing or does not have a 'chapters' array.");
  }

  // Handle case where lesson position wasn't found
  if (chapterNumber === undefined) {
     console.warn(`Lesson with ID ${targetLessonId} (from slug ${lessonSlug}) not found within course structure for slug ${courseSlug}. chapterNumber is undefined.`);
  }

  return (
      <main>
        <Indicator
          chapterNumber={chapterNumber}
          lessonNumberInChapter={lessonNumberInChapter}
          totalLessonsInChapter={totalLessonsInChapter}
        />
        <article className="p-5">
          {lessonContent.title && (
            <h1 className="text-2xl font-bold mb-4">{lessonContent.title}</h1>
          )}
          {lessonContent.body && (
            <div className="prose dark:prose-invert max-w-none">
               <PortableText value={lessonContent.body} />
            </div>
          )}
          {!lessonContent.body && <p>Lesson content not available.</p>}
        </article>
      </main>
  );
}
