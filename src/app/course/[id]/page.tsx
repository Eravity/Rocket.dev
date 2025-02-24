import { getCourse, getContentType } from "@/app/supabase/data-service";
import CurrentPath from "@/app/_components/CurrentPath";

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

  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="py-8 bg-neutral-100 w-screen">
        <div className="container md:px-6 h-full 2xl:px-16 mx-auto">
          <div className="flex flex-col gap-8">
            <CurrentPath id={id} />
            <h1 className="capitalize text-neutral-500 font-semibold">{contentType}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
