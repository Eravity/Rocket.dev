import Image from "next/image";
import Link from "next/link";
import Clock from "./Icons/Clock";
import Files from "./Icons/Files";
import CourseIcon from "./Icons/Course";
import dynamic from "next/dynamic";
import { useLearningEvent } from "../hooks/useLearningEvent";
import InfoCell from "./InfoCell";

import { StaticImageData } from "next/image";

const DynamicProgressPieChart = dynamic(() => import("./ProgressPieChart"), {
  ssr: false,
});

export type CourseData = {
  id: number;
  image: StaticImageData;
  title: string;
  materials: number;
  completion: number;
  deadline: number;
  buttonText: string;
  resources: number;
};

const CourseRow = ({ course, resources }: { course: CourseData, resources: number[] }) => {
  const { emitLearningEvent } = useLearningEvent();
  return (
    <>
      <div className="flex items-center justify-center p-2">
        <div className="relative w-full h-full max-h-[80px] overflow-hidden rounded-lg">
          <Link href={""} className="relative block w-full h-full">
            <Image
              src={course.image}
              alt={course.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover absolute inset-0 transition-transform duration-300 hover:scale-110"
            />
          </Link>
        </div>
      </div>
      <div className="col-span-3 flex flex-col items-start justify-center p-2 space-y-0.5">
        <div className="flex gap-1">
          <CourseIcon />

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
            <Files /> {resources[0]} {resources[0] > 1 ? "Chapters" : "Chapter"}
          </>
        }
      />
      <InfoCell
        label="Completion"
        value={
          <>
            <DynamicProgressPieChart data={course.completion} />{" "}
            {course.completion}%
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
        <button
          onClick={() => emitLearningEvent("start")}
          className="px-3 sm:px-4 py-1 border rounded-md text-xs sm:text-sm transition-all duration-200 hover:bg-blueLotus hover:text-white hover:border-blueLotus active:scale-95"
        >
          {course.buttonText}
        </button>
      </div>
    </>
  );
};

export default CourseRow;
