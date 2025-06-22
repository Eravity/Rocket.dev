"use client";

import dynamic from "next/dynamic";
import SectionTitle from "./SectionTitle";
import React from "react";

const DynamicCourseProgress = dynamic(() => import("./CourseProgress"), {
  ssr: false,
});

function InProgressContent() {
  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-between items-start gap-2">
        <SectionTitle
          title="In progress learning content"
          description="Continue your learning journey"
          info="Here you can see materials that you are currently studying"
        />
        <button className="font-semibold underline-offset-[5px] border-b-2 border-blueLotus text-blueLotus hover:opacity-80 active:scale-95 transition-all duration-200 text-sm sm:text-base">
          View all
        </button>
      </div>
      <DynamicCourseProgress/>
    </div>
  );
}

export default React.memo(InProgressContent);