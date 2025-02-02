import ArrowRight from "./Icons/ArrowRight";
import CourseIcon from "./Icons/CourseIcon";
import DocsIcon from "./Icons/DocsIcon";
import QuizIcon from "./Icons/QuizIcon";

export default function ReviewItem({
  title,
  type,
  questions,
}: {
  icon: string | React.ReactElement;
  title: string;
  type: string;
  questions?: string[];
}) {
  return (
    <div className="flex items-center justify-between p-2 w-full border rounded-lg hover:bg-gray-50">
      <div className="flex items-center gap-4">
        <div className="text-2xl">
          {type === "Course" ? (
            <CourseIcon width={50} height={50} />
          ) : type === "Quiz" ? (
            <QuizIcon width={50} height={50} />
          ) : type === "Page" ? (
            <DocsIcon width={50} height={50} />
          ) : (
            ""
          )}
        </div>
        <div>
          <h1 className="font-medium mb-2">{title}</h1>
          <div className="flex gap-2 items-center">
            <span className="px-2 bg-neutral-200 rounded text-neutral-700 font-semibold text-sm">
              {type}
            </span>
            {questions && (
              <span className="text-sm text-gray-600">
                {questions.length} Questions
              </span>
            )}
          </div>
        </div>
      </div>
      <button className="text-gray-400 pr-2">
        <ArrowRight />
      </button>
    </div>
  );
}
