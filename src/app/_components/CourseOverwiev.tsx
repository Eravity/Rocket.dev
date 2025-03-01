import { getCourseChapters, getArticlesForThisChapters } from "../supabase/data-service";

export default async function CourseOverwiev({ courseId }: { courseId: number }) {
  const sections = await getCourseChapters(courseId);
  const chapters = await getArticlesForThisChapters(courseId);
  return (
    <div>
      <h1 className="text-2xl font-bold">Course content</h1>
      <p className="font-semibold text-neutral-600">{sections} sections &#183;	{chapters.length} chapters</p>
    </div>
  );
}
