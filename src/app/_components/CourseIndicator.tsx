import { getCourseBySlug } from "@/sanity/queries/getCourses";
import { useEffect, useState } from "react";
import CourseTypeIcon from "@/app/_components/CourseTypeIcon";

const CourseIndicator = ({ slug }: { slug: string }) => {
  const [contentType, setContentType] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const courseData = await getCourseBySlug(slug);
      setContentType(courseData?._type);
    };
    fetchData();
  }, [slug]);

  const courseTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return (
    <div className="flex px-5 py-3 border-b items-center gap-2">
      <CourseTypeIcon text={false} contentType={contentType}/>
      <h1 className="font-semibold">{courseTitle}</h1>
    </div>
  );
};

export default CourseIndicator;
