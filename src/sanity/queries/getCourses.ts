import { client } from "../lib/client";
import imageUrlBuilder from '@sanity/image-url';
import { CourseData } from "@/app/_components/CourseRow";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

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
    // build a full absolute URL here:
    image: course.image
      ? urlFor(course.image).width(200).height(200).url()
      : "",
    progress: 0,
    materials: 0,
    completion: 0,
    deadline: '',
    buttonText: 'Continue',
    resources: 0,
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