import Link from 'next/link';

export default function CourseNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-6">Course Not Found</h1>
      <p className="mb-8">The course you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      <Link 
        href="/learning" 
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors"
      >
        Back to Courses
      </Link>
    </div>
  );
}
