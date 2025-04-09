"use client";

import { useParams } from "next/navigation";
import ChapterList from "./ChapterList";
import { memo } from "react";

function ChapterContent({ className }: { className?: string }) {
  const params = useParams();
  const courseSlug = params.slug as string;

  return (
    <aside className={`w-1/4 bg-white ${className}`}>
      <div className="h-full">
        <ChapterList courseSlug={courseSlug} />
      </div>
    </aside>
  );
}

export default memo(ChapterContent);