"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import getCurrentPath from "@/app/utils/getCurrentPath";
import { getCourse } from "@/app/supabase/data-service";

// Helper function to capitalize strings
function capitalize(title: string): string {
  return title.charAt(0).toUpperCase() + title.slice(1);
}

export default function CurrentPath({ id }: { id: number }) {
  const [courseTitle, setCourseTitle] = useState<string>("");
  const currentPath = getCurrentPath();
  const pathSegments = currentPath.split("/").filter(Boolean);
  const breadcrumbSegments = pathSegments.filter(segment => isNaN(Number(segment)));

  useEffect(() => {
    async function fetchCourse() {
      const course = await getCourse(id);
      setCourseTitle(course[0]?.title || "");
    }
    fetchCourse();
  }, [id]);

  return (
    <h1 className="font-semibold text-neutral-500">
      {breadcrumbSegments.map((segment, index) => {
        const subPath = index === 0 ? "/" : "/" + breadcrumbSegments.slice(0, index + 1).join("/");
        return (
          <Link key={index} href={subPath}>
            <span className="cursor-pointer">
              {capitalize(segment)}
              {index < breadcrumbSegments.length - 1 && " / "}
            </span>
          </Link>
        );
      })}
      {courseTitle && (
        <span className="text-black">
          <span className="text-neutral-500">{" / "}</span>{capitalize(courseTitle)}
        </span>
      )}
    </h1>
  );
}
