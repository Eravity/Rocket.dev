import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Clock from "./Icons/Clock";
import Files from "./Icons/Files";
import CourseIcon from "./Icons/CourseIcon";
import { useRelativeTime } from "../_hooks/useRelativeTime";
import InfoCell from "./InfoCell";

const DynamicProgressPieChart = dynamic(() => import("./ProgressPieChart"), {
  ssr: false,
});

export type CourseData = {
  id: number;
  image: string;
  title: string;
  materials: number;
  completion: number;
  deadline: string;
  buttonText: string;
  resources: number;
};

const CourseRow = ({ course, resources }: { course: CourseData; resources: number[] }) => {
  const formattedDeadline = useRelativeTime({ dateString: course.deadline });
  const isUrgent = formattedDeadline.includes("min") || formattedDeadline.includes("h");

  return (
    <>
      <div className="flex items-center justify-center p-2">
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg">
          <Link href={`/learning/course/${course.id}`} className="relative block w-full h-full">
            <Image
              src={course.image}
              alt={course.title}
              fill
              priority 
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover absolute inset-0 transition-transform duration-300 hover:scale-110"
            />
          </Link>
        </div>
      </div>

      <div className="col-span-3 flex flex-col items-start justify-center p-2 space-y-0.5">
        <div className="flex items-center gap-1">
          <CourseIcon />
          <h2 className="w-full flex items-center text-neutral-500 font-semibold text-xs sm:text-sm">
            Course
          </h2>
        </div>
        <div className="w-full">
          <Link
            href={`/learning/course/${course.id}`}
            className="inline-block text-sm sm:text-base md:text-lg font-bold transition-colors duration-200 hover:text-blueLotus line-clamp-1"
          >
            {course.title}
          </Link>
        </div>
      </div>

      <InfoCell label="Content" value={<><Files /> {resources[0]} {resources[0] > 1 ? "Chapters" : "Chapter"}</>} />

      <InfoCell
        label="Completion"
        value={<><DynamicProgressPieChart data={course.completion} /> {course.completion}%</>}
      />

      <InfoCell icon={<Clock color={isUrgent ? "red" : "#737373"} />} label="Deadline" value={formattedDeadline} isUrgent={isUrgent} />

      <div className="flex items-center justify-end pr-2 sm:pr-4 md:pr-6 lg:pr-8">
        <Link
          href={`/learning/course/${course.id}`}
          className="px-3 sm:px-4 py-1 border rounded-md text-xs sm:text-sm transition-all duration-200 hover:bg-blueLotus hover:text-white hover:border-blueLotus active:scale-95"
        >
          {course.completion > 0 ? "Continue" : "Start"}
        </Link>
      </div>
    </>
  );
};

export default CourseRow;
