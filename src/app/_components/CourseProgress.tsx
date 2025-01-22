import Image from "next/image";
import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";
import { StaticImageData } from "next/image";

type CourseData = {
  image: StaticImageData;
  title: string;
  materials: number;
  competition: number;
  deadline: number;
  buttonText: string;
}

const courses: CourseData[] = [
  {
    image: image1,
    title: "Mastering UI/UX Design: A Guide...",
    materials: 5,
    competition: 0,
    deadline: 1,
    buttonText: "Start"
  },
  {
    image: image2,
    title: "Creating Engaging Learning Jour...",
    materials: 14,
    competition: 64,
    deadline: 12,
    buttonText: "Continue"
  }
];

const InfoCell = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex items-center justify-center flex-col p-2 space-y-1">
    <h2 className="w-full h-1/2 flex items-center text-neutral-700 font-semibold text-sm">
      {label}
    </h2>
    <h2 className="w-full h-1/2 flex items-center font-semibold">
      {value}
    </h2>
  </div>
);

const CourseRow = ({ course }: { course: CourseData }) => (
  <>
    <div className="flex items-center justify-center p-2">
      <div className="relative w-full h-full">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover rounded-lg absolute inset-0"
        />
      </div>
    </div>
    <div className="col-span-3 flex flex-col space-y-1 items-center justify-center p-2">
      <h2 className="w-full h-1/2 flex items-center text-neutral-700 font-semibold text-sm">
        Course
      </h2>
      <h2 className="w-full h-1/2 text-xl font-bold">
        {course.title}
      </h2>
    </div>
    <InfoCell label="Content" value={`${course.materials} Materials`} />
    <InfoCell label="Competition" value={`${course.competition}%`} />
    <InfoCell label="Deadline" value={`${course.deadline} hrs`} />
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
