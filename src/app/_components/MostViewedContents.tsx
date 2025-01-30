import InfoSign from "./InfoSign";
import { useContentManager } from "../hooks/useContentManager";
import Content from "./Content";

export default function MostViewedContents() {
  const contents = [
    {
      title: "Enhancing Learning Engagement Through Thoughtful UX/UI",
      type: "Page",
      completition: 5, // adjusted
      timeSpent: new Date(Date.now() - 1000 * 60 * 150), 
    },
    {
      title: "Enhancing Learning Engagement Through Thoughtful UX/UI",
      type: "Course",
      completition: 20, // adjusted from 25
      timeSpent: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      title: "Introduction to React",
      type: "Course",
      completition: 45, // unchanged
      timeSpent: new Date(Date.now() - 1000 * 60 * 75), 
    },
    {
      title: "TypeScript Basics",
      type: "Page",
      completition: 30, // adjusted from 15
      timeSpent: new Date(Date.now() - 1000 * 60 * 105), 
    },
  ];

  const { topContent, otherContent } = useContentManager(contents);
  const totalTop = topContent.reduce((acc, item) => acc + item.completition, 0);
  otherContent.completition = 100 - totalTop;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex gap-2 items-baseline">
        <h1 className="font-bold text-lg">Most viewed contents</h1>
        <InfoSign info="Here are your most viewed articles" />
      </div>
      <div className="flex flex-col gap-4">
        {topContent.map((item, index) => (
          <Content
            key={index}
            title={item.title}
            type={item.type}
            completition={item.completition}
            timeSpent={item.timeSpent}
          />
        ))}
        <Content {...otherContent} />
      </div>
    </section>
  );
}
