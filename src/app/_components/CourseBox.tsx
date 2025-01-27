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
    <div className="h-full flex flex-col w-full border p-2 sm:p-0 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
      <div className="overflow-hidden rounded-t-lg aspect-video relative">
        <Image
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
          src={imageUrl}
          alt={title}
          width={400}
          height={300}
          priority
        />
      </div>
      <div className="flex flex-col justify-between flex-grow px-2 sm:px-4 py-2 sm:py-3">
        <div>
          <h1 className="text-neutral-600 font-semibold text-xs sm:text-sm hover:text-blueLotus transition-colors">{resourceType}</h1>
          <h1 className="font-bold text-sm sm:text-base line-clamp-2 mt-1 hover:text-blueLotus transition-colors">{title}</h1>
          <div className="flex flex-wrap mt-2 gap-2">
            {tags.map((tag, index) => (
              <h1 
                key={index}
                className="px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700 text-xs transition-colors hover:bg-neutral-300 hover:text-neutral-800"
              >
                {tag}
              </h1>
            ))}
          </div>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 mt-4">{status}</p>
      </div>
    </div>
  );
}
