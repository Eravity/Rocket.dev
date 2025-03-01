"use client";
import { useState } from "react";

export default function CourseDescription({
  description,
}: {
  description: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = description.length > 235;
  const displayedDescription =
    isExpanded || !isLong
      ? description + " "
      : description.slice(0, 235) + "... ";

  return (
    <p>
      {displayedDescription}
      {isLong && (
        <button
          className="text-violet-600 font-semibold underline"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      )}
    </p>
  );
}
