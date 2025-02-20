"use client";
import { useEffect, useState } from "react";
import getCurrentPath from "@/app/utils/getCurrentPath";
import { getCourse } from "@/app/supabase/data-service";
import useCapitalize from "@/app/hooks/useCapitalize";

export default function CurrentPath({ id }: { id: number }) {
  const [courseTitle, setCourseTitle] = useState<string>("");
  const currentPath = getCurrentPath();

  useEffect(() => {
    async function fetchCourse() {
      const course = await getCourse(id);
      setCourseTitle(course[0]?.title || "");
    }
    fetchCourse();
  }, [id]);

  return (
    <h1 className="font-semibold">
      <span className="text-neutral-500">
        {useCapitalize({ title: currentPath.split("/")[1] })} /{" "}
      </span>
      <span className="text-black">
        {useCapitalize({ title: courseTitle })}
      </span>
    </h1>
  );
}
