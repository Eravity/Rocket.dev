import { getCourses } from "@/sanity/queries/getCourses";
import {  CourseData } from "@/app/_components/CourseRow";
import { urlFor } from "@/sanity/lib/image";
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
    courses = Array.isArray(result.courses) ? result.courses : [];
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error occurred';
  }

  // Convert Sanity image object to URL
  const getImageUrl = (image: any): string | null => {
    if (!image) return null;
    if (typeof image === 'string') return image;
    if (image._type === 'image' && image.asset) {
      return urlFor(image).width(300).height(200).url();
    }
    return null;
  };

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
          courses.map((course) => {
            const imageUrl = getImageUrl(course.image);
            return (
              <Link
                key={course.id}
                href={`/learning/course/${course.slug}`}
                className="bg-white shadow-md p-4 rounded-md hover:shadow-lg transition-shadow"
              >
                {imageUrl && (
                  <div className="relative w-full h-32 mb-3">
                    <img
                      src={imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                )}
                <h2 className="text-xl font-bold">{course.title}</h2>
                <p className="text-gray-600">{course.description || 'No description available'}</p>
              </Link>
            );
          })
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
