import { useContentManager } from "../_hooks/useContentManager";
import Content from "./Content";
import SectionTitle from "./SectionTitle";
import CourseIcon from "./Icons/CourseIcon";
import DocsIcon from "./Icons/DocsIcon";
import QuizIcon from "./Icons/QuizIcon";

export default function MostViewedContents() {
  const contents = [
    {
      title: "Enhancing Learning Engagement Through Thoughtful UX/UI",
      type: "Quiz",
      completion: 5,
      completition: 5, // Add missing property
      timeSpent: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    },
    {
      title: "Enhancing Learning Engagement Through Thoughtful UX/UI",
      type: "Course",
      completion: 20,
      completition: 20, // Add missing property
      timeSpent: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      title: "Introduction to React",
      type: "Course",
      completion: 45,
      completition: 45, // Add missing property
      timeSpent: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    },
    {
      title: "TypeScript Basics",
      type: "Course",
      completion: 30,
      completition: 30, // Add missing property
      timeSpent: new Date(Date.now() - 1000 * 60 * 105).toISOString(),
    },
  ];

  const { topContent, otherContent } = useContentManager(contents);

  return (
    <section className="flex flex-col gap-3">
      <SectionTitle
        title="Most viewed contents"
        description="Here you can see your most viewed contents"
        info="Here you can see your most viewed contents"
      />
      <div className="flex flex-col gap-4">
        {topContent.map((item, index) => (
          <Content
            icon={
              item.type === "Course" ? (
                <CourseIcon />
              ) : item.type === "Page" ? (
                <DocsIcon />
              ) : item.type === "Quiz" ? (
                <QuizIcon />
              ) : (
                ""
              )
            }
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
