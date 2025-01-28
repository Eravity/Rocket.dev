import Link from "next/link";
import InfoSign from "./InfoSign";

const Content = ({
  title,
  type,
  completition,
  icon,
}: {
  title: string;
  type?: string;
  completition: number;
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
        {completition}%
    </div>
  );
};

export default function MostViewedContents() {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex gap-2 items-baseline">
        <h1 className="font-bold text-lg">Most viewed contents</h1>
        <InfoSign info="Here are your most viewed articles" />
      </div>
      <div className="flex flex-col gap-4">
        <Content
          title="Enhancing Learning Engagement Through Thoughtful UX/UI"
          type="Page"
          completition={58}
        />

        <Content
          title="Enhancing Learning Engagement Through Thoughtful UX/UI"
          type="Course"
          completition={58}
        />

        <Content title="Other task" completition={58} />
      </div>
    </section>
  );
}
