"use client";

import CourseRow, { CourseData } from "./CourseRow";
import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";

export default function CourseProgress() {
  const courses: CourseData[] = [
    {
      image: image1,
      title: "Mastering UI/UX Design: A Guide...",
      materials: 5,
      competition: 0,
      deadline: 1,
      buttonText: "Start",
    },
    {
      image: image2,
      title: "Creating Engaging Learning Jour...",
      materials: 14,
      competition: 64,
      deadline: 24,
      buttonText: "Continue",
    },
  ];
  return (
    <div className="w-full h-auto sm:h-52 grid grid-cols-8 grid-rows-[auto_1px_auto] sm:grid-rows-[1fr_1px_1fr] rounded-lg border overflow-hidden duration-200">
      <CourseRow course={courses[0]} />
      <div className="col-span-8 bg-gray-200" />
      <CourseRow course={courses[1]} />
    </div>
  );
}
