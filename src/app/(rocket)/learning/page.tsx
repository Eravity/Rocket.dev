import { getCourses } from "@/sanity/queries/getCourses";
import Link from "next/link";

export type Course = {
  _id: string;
  title: string;
  description: string;
  slug: {
    current: string;
  };
};

export default async function MyLearningPage() {
  const courses: Course[] = await getCourses();
  return (
    <main className="container mx-auto 2xl:px-16 md:px-6">
      <h1 className="text-3xl font-bold mt-8 mb-4">My Learning</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course._id}
            href={`/learning/course/${course.slug.current}`}
            className="bg-white shadow-md p-4 rounded-md"
          >
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

