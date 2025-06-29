import { client } from "../lib/client";
import imageUrlBuilder from '@sanity/image-url';
import { CourseData } from "@/app/_components/CourseRow";
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface SanityImageAsset {
  _ref: string;
}

interface SanityImage {
  asset: SanityImageAsset;
}

export interface Lesson {
  _id: string;
  _key?: string;
  title: string;
  description?: string;
  content?: string;
  slug?: {
    current: string;
  };
}

export interface Chapter {
  _id: string;
  title: string;
  description?: string;
  content?: string;
  lessons?: Lesson[];
}

interface Course {
  _id: string;
  _type?: string;
  title: string;
  description: string;
  content_type?: string;
  tags?: string[];
  banner?: SanityImage;
  thumbnail?: SanityImage;
  image?: SanityImage;
  chapters: Chapter[];
  slug?: {
    current?: string;
  } | string;
}

interface RawCourse {
  _id: string;
  title: string;
  description?: string;
  slug?: {
    current?: string;
  } | string;
  image?: SanityImage;
  banner?: SanityImage;
  thumbnail?: SanityImage;
  chapters?: Chapter[];
}

export const getCourses = async (): Promise<{ courses: CourseData[]; chaptersCount: { [key: string]: number } }> => {
  // Fetch courses with their chapters and lessons
  const rawCourses: RawCourse[] = await client.fetch(`*[_type == "course"] {
    ..., chapters[]-> {
      ..., lessons[]->
    }
  }`);

  const courses: CourseData[] = rawCourses.map((course: RawCourse) => ({
    id: course._id,
    title: course.title,
    description: course.description || "",
    slug: typeof course.slug === 'string' ? course.slug : (course.slug?.current || ""),
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
  rawCourses.forEach((course: RawCourse) => {
    // Ensure chapters exists and is an array before accessing length
    if (Array.isArray(course.chapters)) {
      chaptersCount[course._id] = course.chapters.length;
    } else {
      chaptersCount[course._id] = 0;
    }
  });

  return { courses, chaptersCount };
};

export const getCourseBySlug = async (slug: string): Promise<Course | null> => {
  const courses: Course[] = await client.fetch(
    `*[_type == "course" && slug.current == $slug] {
      ..., chapters[]-> {
        ..., lessons[]->
      }
    }`,
    { slug }
  );

  const course = courses[0];
  if (!course) return null;

  // Ensure chapters is always an array
  return {
    ...course,
    chapters: course.chapters || []
  };
}

// Helper function to safely get slug string
export const getSlugString = (slug: string | { current?: string } | undefined): string => {
  if (!slug) return '';
  if (typeof slug === 'string') return slug;
  return slug.current || '';
}