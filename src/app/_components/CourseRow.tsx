import {useRelativeTime} from "../_hooks/useRelativeTime";
import Image from "next/image";
import Link from "next/link";
import CourseIcon from "./Icons/CourseIcon";
import Clock from "./Icons/Clock";

export type CourseData = {
  id: number | string;
  image: string;       // now always a full URL
  title: string;
  materials: number;
  completion: number;
  deadline: string;
  buttonText: string;
  resources: number;
  contentType?: string;
  description: string;
  slug: string;
};

const CourseRow = ({course, resources}: { course: CourseData; resources: number[] }) => {
  const formattedDeadline = useRelativeTime({dateString: course.deadline});
  const isUrgent = formattedDeadline.includes("min") || formattedDeadline.includes("h");
  // use the URL directly
  const imageUrl = course.image;

  return (
    <div className="flex border rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex flex-row gap-3 md:gap-6 items-center py-3 px-3 md:py-4 md:px-4 w-full">
        {/* Image section */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="relative w-12 md:w-16 aspect-square overflow-hidden rounded-xl">
              <Link href={`/learning/course/${course.slug}`} className="relative block w-full h-full">
                <Image
                  src={imageUrl}
                  alt={course.title}
                  fill
                  priority
                  unoptimized
                  className="object-cover absolute inset-0 transition-transform duration-300 hover:scale-110"
                />
              </Link>
            </div>
            <CourseIcon
              className="absolute -top-2.5 -right-2.5 border-2 border-white rounded-lg"
              width={20}
              height={20}
              color={"bg-blue-100"}
              stroke={'#82B4FF'}
            />
          </div>
        </div>

        {/* Course info section */}
        <div className="flex justify-center flex-col flex-grow min-w-0">
          <div className="flex items-center gap-1 md:gap-2">
            <small className="font-bold text-[#5194FB] text-xs md:text-sm">Course</small>
            <p className="mb-0 text-neutral-500">&#x2022;</p>
            <small className="font-medium text-neutral-500 text-xs md:text-sm">{resources} Chapters</small>
          </div>

          <div className="flex flex-col gap-1 md:gap-2">
            <Link href={`/learning/course/${course.slug}`} className="font-bold w-fit text-gray-800  hover:underline truncate">
              {course.title}
            </Link>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-full p-0.5 bg-gray-200 rounded-full overflow-hidden">
                <div className={`w-[28%] max-h-1.5 rounded-full bg-blue-500`}>‎ </div>
              </div>
              <p className="font-semibold text-xs md:text-sm whitespace-nowrap">28%</p>
            </div>
          </div>
        </div>

        {/* Deadline and button section */}
        <div className="flex justify-between items-end h-full flex-col ml-auto">
          <div className="flex flex-col items-end">
            <div className="flex gap-1 md:gap-2 items-center">
              <Clock className={`w-4 h-4 md:w-5 md:h-5`} color={isUrgent ? '#ef4444' : '#6b7280'}/>
              <p className={`text-xs md:text-sm font-semibold ${isUrgent ? 'text-red-500' : 'text-gray-500'}`}>
                {formattedDeadline}
              </p>
            </div>
            <small className="text-xs text-neutral-500 font-medium mb-1">{isUrgent ? 'Overdue' : 'Remaining'}</small>
          </div>
          <button
            className="py-1 px-3 md:px-4 mt-2 text-xs md:text-sm border-2 font-semibold border-[#5194FB] text-[#5194FB] bg-[#E6F0FB] rounded-md whitespace-nowrap hover:bg-[#d0e4fb] transition-colors">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseRow;