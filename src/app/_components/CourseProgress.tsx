"use client";
import { useEffect, useState } from "react";
import {
  getCourses,
  getCourseChapters,
  getCourse,
} from "../supabase/data-service";
import CourseRow, { CourseData } from "./CourseRow";

export default function CourseProgress() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [courseChapters, setCourseChapters] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const courseData = await getCourses();
        if (!courseData || courseData.length === 0) {
          setError("No courses found.");
          return;
        }
        setCourses(courseData);

        // Fetch chapters for all courses
        const chaptersCount: { [key: number]: number } = {};
        for (const course of courseData) {
          const count = await getCourseChapters(course.id);
          chaptersCount[course.id] = count;
        }
        setCourseChapters(chaptersCount);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error fetching courses");
        }
      }
    }
    fetchCourses();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (courses.length < 2) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-auto sm:h-52 grid grid-cols-8 grid-rows-[auto_1px_auto] sm:grid-rows-[1fr_1px_1fr] rounded-lg border overflow-hidden duration-200">
      <CourseRow
        course={courses[0]}
        resources={courseChapters[courses[0].id] || 0}
      />
      <div className="col-span-8 bg-gray-200" />
      <CourseRow
        course={courses[1]}
        resources={courseChapters[courses[1].id] || 0}
      />
    </div>
  );
}
