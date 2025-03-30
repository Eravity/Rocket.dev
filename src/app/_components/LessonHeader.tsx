"use client";
import { usePathname, useRouter } from "next/navigation";
import CourseIcon from "./Icons/CourseIcon";
import ArrowLeft from "./Icons/ArrowLeft";

export default function LessonHeader() {
  const pathname = usePathname();
  const courseName =
    pathname.split("/")[3].split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "); 
  const router = useRouter();

  return (
    <header className="flex items-center justify-start gap-6 w-full py-4">
      <button className="p-2 bg-neutral-200 rounded-md" onClick={() => router.back()}><ArrowLeft width={15} height={15}/></button>
      <div className="flex items-center gap-2">
        <CourseIcon width={25} height={25}/>
        <h1 className="font-bold">{courseName}</h1>
      </div>
    </header>
  );
}
