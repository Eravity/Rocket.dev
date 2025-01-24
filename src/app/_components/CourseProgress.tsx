import Image from "next/image";
import Link from "next/link";
import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";
import { StaticImageData } from "next/image";
import Clock from "./Clock";

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
  value: string | number;
  icon?: React.ReactNode;
  isUrgent?: boolean;
}) => (
  <div className="flex items-center justify-center flex-col p-2 space-y-1">
    <h2 className="w-full h-1/2 flex items-center text-neutral-700 font-semibold text-sm">
      {label}
    </h2>
    <h2
      className={`w-full h-1/2 flex gap-1 items-center font-semibold ${
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
      <div className="relative w-full h-full">
        <Link href={''}>
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover rounded-lg absolute inset-0"
          />
        </Link>
      </div>
    </div>
    <div className="col-span-3 flex flex-col space-y-1 items-center justify-center p-2">
      <h2 className="w-full h-1/2 flex items-center text-neutral-700 font-semibold text-sm">
        Course
      </h2>
      <Link href={""} className="w-full h-1/2 text-xl font-bold">
        {course.title}
      </Link>
    </div>
    <InfoCell label="Content" value={`${course.materials} Materials`} />
    <InfoCell label="Competition" value={`${course.competition}%`} />
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
    <div className="flex items-center justify-end pr-7">
      <button className="px-4 py-1 border rounded-md">
        {course.buttonText}
      </button>
    </div>
  </>
);

export default function CourseProgress() {
  return (
    <div className="w-full h-48 grid grid-cols-8 grid-rows-[1fr_1px_1fr] rounded-lg border">
      <CourseRow course={courses[0]} />
      <div className="col-span-8 bg-gray-200" />
      <CourseRow course={courses[1]} />
    </div>
  );
}
