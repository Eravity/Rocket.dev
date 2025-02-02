"use client";
import React from "react";
import { useEffect, useState } from "react";
import { fetchCourseData } from "../services/courseService";
import CourseRow, { CourseData } from "./CourseRow";

export default function CourseProgress() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [courseChapters, setCourseChapters] = useState<{ [key: number]: number }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourses() {
      try {
        const { courses, chaptersCount } = await fetchCourseData();
        setCourses(courses);
        setCourseChapters(chaptersCount);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error fetching courses");
        }
      }
    }
    loadCourses();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (courses.length < 2) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-auto grid grid-cols-8 grid-rows-[auto_1px_auto] sm:grid-rows-[1fr_1px_1fr] rounded-lg border overflow-hidden duration-200">
      {courses.slice(0, 2).map((course, index, arr) => (
        <React.Fragment key={course.id}>
          <CourseRow
            course={course}
            resources={[courseChapters[course.id] || 0]}
          />
          {index < arr.length - 1 && <div className="col-span-8 bg-gray-200" />}
        </React.Fragment>
      ))}
    </div>
  );
}
