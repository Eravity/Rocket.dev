"use client"

import dynamic from "next/dynamic";
const DynamicCourseProgress = dynamic(() => import("./CourseProgress"), {
  ssr: false
});
import InfoSign from "./InfoSign";

export default function InProgressContent() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-base sm:text-lg">In progress learning content</h1>
          <InfoSign info="This is just an information sign!" />
        </div>
        <button className="self-start sm:self-auto font-semibold underline-offset-[5px] border-b-2 border-blueLotus text-blueLotus transition-all duration-200 text-sm sm:text-base">
          View all
        </button>
      </div>
      <DynamicCourseProgress />
    </div>
  );
}
