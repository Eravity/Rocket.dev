import {
  getCourse,
  getContentType,
  getCourseTags,
} from "@/app/supabase/data-service";
import CourseHeader from "@/app/_components/CourseHeader";
import CourseChapters from "@/app/_components/CourseChapters";
import CertificateBanner from "@/app/_components/CertificateBanner";
import CourseDescription from "@/app/_components/CourseDescription";

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
    <main className="flex flex-col space-y-16">
      <CourseHeader
        id={id}
        course={course}
        contentType={contentType}
        tags={tags}
      />

      <section className="container mx-auto flex gap-14 md:px-6 2xl:px-16">
        <div className="w-9/12 flex flex-col gap-14">
          <CourseDescription description={course.description} />
          <CertificateBanner />
          <div className="flex flex-col gap-6">
            <CourseChapters course={course} />
          </div>
        </div>
        <aside className="w-3/12 border-2 rounded-lg"></aside>
      </section>
    </main>
  );
}
