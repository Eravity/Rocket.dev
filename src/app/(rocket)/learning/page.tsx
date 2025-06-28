import { getCourses } from "@/sanity/queries/getCourses";
import {  CourseData } from "@/app/_components/CourseRow";
import Link from "next/link";

export type Course = {
  _id?: string;
  id: string;
  title: string;
  description: string;
  slug: string;
  image?: string;
  progress?: number;
  materials?: number;
  completion?: number;
  deadline?: string;
  buttonText?: string;
  resources?: number;
};

export default async function MyLearningPage() {
  let courses: CourseData[] = [];
  let error: string | null = null;

  try {
    const result = await getCourses();

    // Access the courses array from the result object
    courses = Array.isArray(result.courses) ? result.courses : [];
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error occurred';
  }

  return (
    <main className="container mx-auto 2xl:px-16 md:px-6">
      <h1 className="text-3xl font-bold mt-8 mb-4">My Learning</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Link
              key={course.id}
              href={`/learning/course/${course.slug}`}
              className="bg-white shadow-md p-4 rounded-md"
            >
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p className="text-gray-600">{course.description || 'No description available'}</p>
            </Link>
          ))
        ) : (
          <div className="col-span-full">
            <p className="text-gray-500">No courses available.</p>
            <p className="text-sm text-gray-400 mt-2">
              Debug info: Found {courses.length} courses
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
