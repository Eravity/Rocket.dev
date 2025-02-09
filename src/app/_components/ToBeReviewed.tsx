import ReviewItem from "./ReviewItem";
import SectionTitle from "./SectionTitle";

const dummyReviews = [
  {
    title: "JavaScript Fundamentals",
    type: "Quiz",
    questions: ["q1", "q2", "q3"],
  },
  {
    title: "React Basics",
    type: "Course",
  },
  {
    title: "TypeScript Essential",
    type: "Quiz",
    questions: ["q1", "q2", "q3", "q4"],
  },
  {
    title: "Next.js Deep Dive",
    type: "Course",
  },
  {
    title: "React Advanced Patterns",
    type: "Quiz",
    questions: ["q1", "q2"],
  },
];

export default function ToBeReviewed() {
  return (
    <section className="flex flex-col gap-3">
      <SectionTitle
        title="To be reviewed"
        info="Here is the content that you should review"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {dummyReviews.slice(0, 4).map((review, index) => (
          <ReviewItem
            key={index}
            icon="defaultIcon"
            title={review.title}
            type={review.type}
            questions={review.questions}
          />
        ))}
      </div>
    </section>
  );
}
