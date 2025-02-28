import {
  getCourse,
  getContentType,
  getCourseTags,
} from "@/app/supabase/data-service";
import CourseHeader from "@/app/_components/CourseHeader";
import CourseChapters from "@/app/_components/CourseChapters";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const course = (await getCourse(id))[0];
  if (!course.content_ref_id) {
    throw new Error("Missing content_ref_id in course");
  }

  const contentType = await getContentType(course.content_ref_id);
  const tagsData = await getCourseTags(course.id);
  const tags = tagsData?.[0]?.tags || [];

  return (
    <main>
      <CourseHeader
        id={id}
        course={course}
        contentType={contentType}
        tags={tags}
      />
      <div className="container mx-auto">
        <CourseChapters course={course} />
      </div>
    </main>
  );
}
