import Link from "next/link";
import CourseIcon from "./Icons/CourseIcon";
import QuizIcon from "./Icons/QuizIcon";
import DocsIcon from "./Icons/DocsIcon";

const Content = ({
  title,
  type,
  displayPercentage,
  timeSpent,
}: {
  title: string;
  type?: string;
  displayPercentage: number;
  timeSpent?: string;
  icon?: string | React.ReactElement;
}) => {
  return (
    <div className="flex justify-between p-2 border border-gray-200 rounded-lg">
      <h1 className="flex gap-2 text-sm items-center font-semibold">
        {type === "Course" ? (
          <CourseIcon width={20} height={20} />
        ) : type === "Quiz" ? (
          <QuizIcon width={20} height={20} />
        ) : type === "Page" ? (
          <DocsIcon width={20} height={20} />
        ) : null}
        <Link href={""}>{title}</Link>
        {type && (
          <span className="text-gray-500 bg-neutral-200 px-2 flex items-center justify-center w-fit rounded">
            {type}
          </span>
        )}
      </h1>
      <div className="w-1/4 flex relative items-center ml-auto h-6 rounded">
        <h1 className="absolute z-10 text-sm font-semibold text-neutral-600 pr-1 w-full text-right">
          {displayPercentage || 0}% ({timeSpent || '0h'})
        </h1>
        <div
          className="rounded h-full ml-auto bg-[#82ca9d]/30"
          style={{ width: `${displayPercentage || 0}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Content;
