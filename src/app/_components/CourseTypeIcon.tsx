import CourseIcon from "@/app/_components/Icons/CourseIcon";
import DocsIcon from "@/app/_components/Icons/DocsIcon";
import QuizIcon from "@/app/_components/Icons/QuizIcon";

type ContentType = "course" | "article" | "quiz";

interface CourseTypeIconProps {
  contentType: ContentType | string;
}

export default function CourseTypeIcon({ contentType }: CourseTypeIconProps) {
  return (
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
  );
}
