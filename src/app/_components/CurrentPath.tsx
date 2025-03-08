"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import useCurrentPath from "../_utils/getCurrentPath"; // Fix the import path
import { getCourse } from "@/app/_supabase/data-service";

// Helper function to capitalize strings
function capitalize(title: string): string {
  return title.charAt(0).toUpperCase() + title.slice(1);
}

export default function CurrentPath({ id }: { id: number }) {
  const [courseTitle, setCourseTitle] = useState<string>("");
  const pathData = useCurrentPath();
  const segments = useMemo(() => pathData?.segments || [], [pathData]);

  const breadcrumbSegments = useMemo(() => {
    // Start with Home and add filtered segments
    const filteredSegments = ["Home", ...segments.filter(segment => isNaN(Number(segment)))];
    return filteredSegments;
  }, [segments]);

  useEffect(() => {
    let mounted = true;

    async function fetchCourse() {
      const course = await getCourse(id);
      if (mounted) {
        setCourseTitle(course[0]?.title || "");
      }
    }

    fetchCourse();
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <h1 className="font-semibold text-neutral-500">
      {breadcrumbSegments.map((segment, index) => {
        // For Home, link to root
        // For other segments, build path based on original segments to maintain proper routing
        const subPath = index === 0 
          ? "/" 
          : `/${segments.slice(0, index).join("/")}`;
        
        return (
          <Link key={index} href={subPath}>
            <span className="cursor-pointer">
              {segment === "Home" ? segment : capitalize(segment)}
              {index < breadcrumbSegments.length - 1 && " / "}
            </span>
          </Link>
        );
      })}
      {courseTitle && (
        <span className="text-black">
          <span className="text-neutral-500">{" / "}</span>
          {capitalize(courseTitle)}
        </span>
      )}
    </h1>
  );
}