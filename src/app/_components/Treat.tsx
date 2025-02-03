"use client";
import Roadmap from "../_components/Roadmap";

export default function Treat() {
  return (
    <div
      className={`relative rounded-xl flex flex-col md:flex-row gap-4 md:gap-0 justify-between p-4 min-h-[100px] bg-white border border-gray-200`}
    >
      <Roadmap completionPercentage={58} />
    </div>
  );
}
