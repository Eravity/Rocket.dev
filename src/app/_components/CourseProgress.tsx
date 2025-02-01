"use client";

import { useEffect, useState } from "react";
import { getCourses } from "../supabase/data-service";
import CourseRow, { CourseData } from "./CourseRow";

export default function CourseProgress() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const courseData = await getCourses();
        if (!courseData || courseData.length === 0) {
          setError("No courses found.");
        }
        setCourses(courseData || []);
      } catch (err: unknown) {
        console.error("Error fetching courses: ", err);
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

  if (courses.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-auto sm:h-52 grid grid-cols-8 grid-rows-[auto_1px_auto] sm:grid-rows-[1fr_1px_1fr] rounded-lg border overflow-hidden duration-200">
      <CourseRow course={courses[0]} />
      <div className="col-span-8 bg-gray-200" />
      <CourseRow course={courses[1]} />
    </div>
  );
}
