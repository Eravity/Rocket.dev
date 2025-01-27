"use client";

import Image from "next/image";
import Link from "next/link";
import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";
import { StaticImageData } from "next/image";
import Clock from "./Icons/Clock";
import Files from "./Icons/Files";
import dynamic from "next/dynamic";
import CourseIcon from "./Icons/course";

const DynamicProgressPieChart = dynamic(() => import("./ProgressPieChart"), {
  ssr: false,
});

type CourseData = {
  image: StaticImageData;
  title: string;
  materials: number;
  competition: number;
  deadline: number;
  buttonText: string;
};

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

const InfoCell = ({
  label,
  value,
  icon,
  isUrgent,
}: {
  label: string;
  value: string | number | React.ReactNode;
  icon?: React.ReactNode;
  isUrgent?: boolean;
}) => (
  <div className="flex items-start justify-center flex-col p-2 space-y-2">
    <h2 className="w-full flex items-center text-neutral-500 font-semibold text-xs sm:text-sm">
      {label}
    </h2>
    <h2
      className={`w-full flex gap-1 items-center font-semibold text-xs sm:text-sm ${
        isUrgent ? "text-red-500" : ""
      }`}
    >
      {icon}
      {value}
    </h2>
  </div>
);

const CourseRow = ({ course }: { course: CourseData }) => (
  <>
    <div className="flex items-center justify-center p-2">
      <div className="relative w-full h-full max-h-[80px] overflow-hidden rounded-lg">
        <Link href={""} className="block h-full">
          <Image
            src={course.image}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-cover absolute inset-0 transition-transform duration-300 hover:scale-110"
          />
        </Link>
      </div>
    </div>
    <div className="col-span-3 flex flex-col items-start justify-center p-2 space-y-0.5">
      <div className="flex gap-1">
        <div className="w-fit h-fit flex items-center justify-center p-[2px] rounded bg-skySplash">
          <CourseIcon />
        </div>
        <h2 className="w-full flex items-center text-neutral-500 font-semibold text-xs sm:text-sm">
          Course
        </h2>
      </div>
      <div className="w-full">
        <Link
          href={""}
          className="inline-block text-sm sm:text-base md:text-lg font-bold transition-colors duration-200 hover:text-blueLotus line-clamp-1"
        >
          {course.title}
        </Link>
      </div>
    </div>
    <InfoCell
      label="Content"
      value={
        <>
          <Files /> {course.materials}
        </>
      }
    />
    <InfoCell
      label="Competition"
      value={
        <>
          <DynamicProgressPieChart data={course.competition} />{" "}
          {course.competition}%
        </>
      }
    />
    <InfoCell
      icon={<Clock color={course.deadline < 24 ? "red" : "#737373"} />}
      label="Deadline"
      value={
        course.deadline >= 24
          ? `${Math.floor(course.deadline / 24)}D ${course.deadline % 24}h`
          : `${course.deadline}h`
      }
      isUrgent={course.deadline < 24}
    />
    <div className="flex items-center justify-end pr-2 sm:pr-4 md:pr-6 lg:pr-8">
      <button className="px-3 sm:px-4 py-1 border rounded-md text-xs sm:text-sm transition-all duration-200 hover:bg-blueLotus hover:text-white hover:border-blueLotus active:scale-95">
        {course.buttonText}
      </button>
    </div>
  </>
);

export default function CourseProgress() {
  return (
    <div className="w-full h-auto sm:h-52 grid grid-cols-8 grid-rows-[auto_1px_auto] sm:grid-rows-[1fr_1px_1fr] rounded-lg border overflow-hidden duration-200">
      <CourseRow course={courses[0]} />
      <div className="col-span-8 bg-gray-200" />
      <CourseRow course={courses[1]} />
    </div>
  );
}
