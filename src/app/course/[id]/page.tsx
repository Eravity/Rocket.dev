import {
  getCourse,
  getContentType,
  getCourseTags,
} from "@/app/supabase/data-service";
import CurrentPath from "@/app/_components/CurrentPath";
import CourseIcon from "@/app/_components/Icons/CourseIcon";
import DocsIcon from "@/app/_components/Icons/DocsIcon";
import QuizIcon from "@/app/_components/Icons/QuizIcon";
import FavouriteButton from "@/app/_components/FavouriteButton";
import Image from "next/image";

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
    <div className="">
      {/* Header section with neutral background */}
      <div className="pt-8 pb-24 bg-neutral-100 w-full">
        {/* Container for all content */}
        <div className="container mx-auto md:px-6 2xl:px-16">
          {/* CurrentPath always at top */}
          <CurrentPath id={id} />
          
          {/* Content flex container - header and image */}
          <div className="flex flex-row gap-8 mt-8">
            {/* Left side - header content - removed vertical centering */}
            <div className="flex-1">
              <div className="flex flex-col">
                <div className="flex flex-col gap-4">
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
                <h1 className="text-4xl max-w-2xl my-2 font-bold">
                  {course.title}
                </h1>
                <ul className="flex gap-2 mt-4">
                  {tags.map((tag: string) => (
                    <li key={tag} className="text-neutral-700 text-sm">
                      <span className="px-2 py-0.5 flex items-center bg-neutral-200 rounded-full">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 mt-6">
                <button className="bg-blueLotus px-6 py-2 text-white hover:bg-indigo-500 font-semibold rounded-lg">
                  Continue
                </button>
                <FavouriteButton />
              </div>
            </div>

            {/* Right side - image */}
            <div className="flex-shrink-0 self-center">
              <div className="relative aspect-video h-80 rounded-lg">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
