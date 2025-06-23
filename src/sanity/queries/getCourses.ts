import { client } from "../lib/client";
import { CourseData } from "@/app/_components/CourseRow";

export const getCourses = async () => {
  // Fetch courses with their chapters and lessons
  const rawCourses = await client.fetch(`*[_type == "course"] {
    ..., chapters[]-> {
      ..., lessons[]->
    }
  }`);

  // Format courses in the structure expected by CourseProgress component
  const courses: CourseData[] = rawCourses.map((course: any) => ({
    id: course._id,
    title: course.title,
    description: course.description || "",
    slug: course.slug?.current || course.slug || "",
    image: course.image || "",
    progress: 0 // Default progress value
  }));

  // Calculate the number of chapters per course
  const chaptersCount: { [key: string]: number } = {};
  rawCourses.forEach((course: any) => {
    // Ensure chapters exists and is an array before accessing length
    if (Array.isArray(course.chapters)) {
      chaptersCount[course._id] = course.chapters.length;
    } else {
      chaptersCount[course._id] = 0;
    }
  });

  return { courses, chaptersCount };
};

export const getCourseBySlug = async (slug: string) => {
  const courses = await client.fetch(
    `*[_type == "course" && slug.current == $slug] {
      ..., chapters[]-> {
        ..., lessons[]->
      }
    }`,
    { slug }
  );
  return courses[0];
}