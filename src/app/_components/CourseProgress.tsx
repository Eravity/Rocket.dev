"use client";
import React, {useEffect, useState} from "react";
import CourseRow, {CourseData} from "./CourseRow";
import { getCourses } from "@/sanity/queries/getCourses";

export default function CourseProgress() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [courseChapters, setCourseChapters] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourses() {
      try {
        const {courses, chaptersCount} = await getCourses();
        setCourses(courses);
        setCourseChapters(chaptersCount);
        console.log(chaptersCount)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error fetching courses");
        }
      }
    }

    void loadCourses();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (courses.length < 2) {
    return <div>Loading...</div>;
  }

  return (
    <div className={"flex flex-col gap-4"}>
      {courses.slice(0, 2).map((course) => (
        <React.Fragment key={course.id}>
          <CourseRow
            course={course}
            resources={[courseChapters[String(course.id)] || 0]}
          />
        </React.Fragment>
      ))}
    </div>
  );
}