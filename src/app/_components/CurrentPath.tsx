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
    <h1 className="font-semibold">
      {breadcrumbSegments.map((segment, index) => {
        // For the first element, navigate to the main page ("/")
        // For other elements, navigate to the corresponding location in the path
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
          {" / "}{capitalize(courseTitle)}
        </span>
      )}
    </h1>
  );
}
