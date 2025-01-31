"use client";

import dynamic from "next/dynamic";
import SectionTitle from "./SectionTitle";

export default function InProgressContent() {
  const DynamicCourseProgress = dynamic(() => import("./CourseProgress"), {
    ssr: false,
  });
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <SectionTitle
          title="In progress learning content"
          info="Here you can see materials that you are currently studying"
        />
        <button className="self-start sm:self-auto font-semibold underline-offset-[5px] border-b-2 border-blueLotus text-blueLotus hover:opacity-80 active:scale-95 transition-all duration-200 text-sm sm:text-base">
          View all
        </button>
      </div>
      <DynamicCourseProgress />
    </div>
  );
}
