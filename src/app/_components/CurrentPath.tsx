"use client";

import { useEffect, useState } from "react";
import { getCourse } from "@/app/_supabase/data-service";
import Link from "next/link";

interface CurrentPathProps {
  id: string | number; 
  title?: string;
  isSanityCourse?: boolean;
  courseTitle?: string; 
}

export default function CurrentPath({ id, isSanityCourse = false, courseTitle }: CurrentPathProps) {
  const [title, setTitle] = useState<string>(courseTitle || "");
  const [isLoading, setIsLoading] = useState<boolean>(!courseTitle);

  useEffect(() => {
    if (courseTitle) {
      setTitle(courseTitle);
      return;
    }
    
    // Only fetch from Supabase if it's not a Sanity course and we don't have the title
    if (!isSanityCourse && !courseTitle && typeof id === 'number') {
      const fetchCourse = async () => {
        try {
          setIsLoading(true);
          const course = await getCourse(id as number);
          if (course.length > 0) {
            setTitle(course[0].title);
          }
        } catch (error) {
          console.error("Error fetching course:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchCourse();
    }
  }, [id, courseTitle, isSanityCourse]);

  return (
    <div className="flex items-center text-sm text-neutral-400">
      <Link href="/learning" className="hover:text-neutral-600">
        Learning
      </Link>
      <span className="mx-2">/</span>
      <span className="text-neutral-600">
        {isLoading ? "Loading..." : title || "Course"}
      </span>
    </div>
  );
}