import {
  getCourse,
  getContentType,
  getCourseTags,
} from "@/app/supabase/data-service";
import CurrentPath from "@/app/_components/CurrentPath";
import CourseIcon from "@/app/_components/Icons/CourseIcon";
import DocsIcon from "@/app/_components/Icons/DocsIcon";
import QuizIcon from "@/app/_components/Icons/QuizIcon";

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
    <div className="flex items-center justify-center mx-auto">
      <div className="py-8 bg-neutral-100 w-screen">
        <div className="container md:px-6 h-full 2xl:px-16 mx-auto">
          <div className="flex flex-col gap-8">
            <CurrentPath id={id} />
            <h1 className="capitalize text-neutral-500 font-semibold">
              <span className="flex items-center gap-2">
                {contentType === "course" ? (
                  <CourseIcon width={20} height={20} />
                ) : contentType === "article" ? (
                  <DocsIcon width={20} height={20} />
                ) : contentType === "quiz" ? (
                  <QuizIcon width={20} height={20} />
                ) : null}
                {contentType}
              </span>
            </h1>
          </div>
          <h1 className="text-4xl max-w-2xl font-bold">{course.title}</h1>
          <ul className="flex gap-2 mt-4">
            {tags.map((tag: string) => (
              <li key={tag} className="text-neutral-700 text-sm">
                <span className="px-2 py-0.5 flex items-center bg-neutral-200 rounded-full">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
