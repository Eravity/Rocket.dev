import InfoSign from "./InfoSign";
import { useContentManager } from "../hooks/useContentManager";
import Content from "./Content";

export default function MostViewedContents() {
  const contents = [
    {
      title: "Enhancing Learning Engagement Through Thoughtful UX/UI",
      type: "Page",
      completition: 5,
      timeSpent: new Date(Date.now() - 1000 * 60 * 150).toISOString(), 
    },
    {
      title: "Enhancing Learning Engagement Through Thoughtful UX/UI",
      type: "Course",
      completition: 20,
      timeSpent: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      title: "Introduction to React",
      type: "Course",
      completition: 45, 
      timeSpent: new Date(Date.now() - 1000 * 60 * 75).toISOString(), 
    },
    {
      title: "TypeScript Basics",
      type: "Page",
      completition: 30, 
      timeSpent: new Date(Date.now() - 1000 * 60 * 105).toISOString(), 
    },
  ];

  const { topContent, otherContent } = useContentManager(contents);

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
            displayPercentage={item.displayPercentage}
            timeSpent={item.timeSpent}
          />
        ))}
        <Content 
          title={otherContent.title}
          displayPercentage={otherContent.displayPercentage}
          timeSpent={otherContent.timeSpent}
        />
      </div>
    </section>
  );
}
