import Image from "next/image";
import CurrentPath from "@/app/_components/CurrentPath";
import CourseTypeIcon from "@/app/_components/CourseTypeIcon";
import FavouriteButton from "@/app/_components/FavouriteButton";
import TagsList from "@/app/_components/TagsList";

interface CourseHeaderProps {
  id: number;
  course: {
    id: number;
    title: string;
    image: string;
  };
  contentType: string;
  tags: string[];
}

export default function CourseHeader({ id, course, contentType, tags }: CourseHeaderProps) {
  return (
    <section className="pt-8 pb-24 bg-neutral-100 w-full">
      <div className="container mx-auto md:px-6 2xl:px-16">
        <CurrentPath id={id} />
        
        <div className="flex flex-row gap-8 mt-8">
          {/* Course information */}
          <div className="flex-1">
            <div className="capitalize text-neutral-500 font-semibold">
              <CourseTypeIcon contentType={contentType} />
            </div>
            
            <h1 className="text-4xl max-w-xl font-bold">
              {course.title}
            </h1>
            
            <TagsList tags={tags} />

            <div className="flex gap-4 mt-6">
              <button className="bg-blueLotus px-6 py-2 text-white hover:bg-indigo-500 font-semibold rounded-lg">
                Continue
              </button>
              <FavouriteButton />
            </div>
          </div>

          {/* Course image */}
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
    </section>
  );
}
