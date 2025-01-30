import Link from "next/link";

const Content = ({
  title,
  type,
  completition,
  timeSpent,
  icon,
}: {
  title: string;
  type?: string;
  completition?: number;
  timeSpent?: string;
  icon?: string;
}) => {
  return (
    <div className="flex justify-between p-2 border border-gray-200 rounded-lg">
      <h1 className="flex gap-2 text-sm font-semibold">
        {icon} <Link href={""}>{title}</Link>
        {type && (
          <span className="text-gray-500 bg-neutral-200 px-2 flex items-center justify-center w-fit rounded-full">
            {type}
          </span>
        )}
      </h1>
      <div className="w-1/4 flex relative items-center ml-auto h-6 rounded">
        <h1 className="absolute z-10 text-sm font-semibold text-neutral-600 pr-1 w-full text-right">
          {completition}% ({timeSpent})
        </h1>
        <div
          className="rounded h-full ml-auto bg-[#82ca9d]/30"
          style={{ width: `${completition}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Content;
