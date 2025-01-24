import Image from "next/image";

interface CourseBoxProps {
  imageUrl: string;
  title: string;
  resourceType: string;
  tags: string[];
  status: string;
}

export function CourseBox({ imageUrl, title, resourceType, tags, status }: CourseBoxProps) {
  return (
    <div className="h-full flex flex-col min-w-[362px] border p-2 sm:p-3 rounded-lg overflow-hidden">
      <Image
        className="w-full h-48 sm:h-28 object-cover rounded-lg"
        src={imageUrl}
        alt={title}
        width={400}
        height={300}
      />
      <div className="px-2 sm:px-4 py-2 sm:py-3">
        <h1 className="text-neutral-600 font-semibold text-sm sm:text-base">{resourceType}</h1>
        <h1 className="font-bold text-sm sm:text-base md:text-lg">{title}</h1>
        <div className="flex flex-wrap mt-2 mb-6 sm:mb-10 gap-2">
          {tags.map((tag, index) => (
            <h1 
              key={index}
              className="px-2 py-1 rounded-full bg-neutral-200 text-neutral-700 text-xs sm:text-sm"
            >
              {tag}
            </h1>
          ))}
        </div>
        <p className="text-xs sm:text-sm text-neutral-600">{status}</p>
      </div>
    </div>
  );
}
