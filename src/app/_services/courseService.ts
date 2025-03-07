import { getCourses, getCourseChapters } from "../_supabase/data-service";

export async function fetchCourseData() {
  const courses = await getCourses();
  if (!courses || courses.length === 0) {
    throw new Error("No courses found.");
  }
  // Parallelize chapter fetching
  const chaptersArray = await Promise.all(
    courses.map(course => getCourseChapters(course.id))
  );
  const chaptersCount = courses.reduce((acc, course, idx) => {
    acc[course.id] = chaptersArray[idx];
    return acc;
  }, {} as Record<number, number>);
  
  return { courses, chaptersCount };
}
