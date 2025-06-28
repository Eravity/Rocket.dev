import { CourseBox } from "./CourseBox";
import image1 from "../_images/1.jpg";
import image2 from "../_images/2.jpg";
import SectionTitle from "./SectionTitle";

const dummyCourses = [
  {
    imageUrl: image1.src,
    title: "Enhancing Learning Engagement Through Thoughtful UX/UI",
    resourceType: "Course",
    tags: ["Prototyping", "Urgent"],
    status: "Active",
  },
  {
    imageUrl: image2.src,
    title: "UX/UI 101 - For Beginners to be great and good Designer",
    resourceType: "Article",
    tags: ["Prototyping", "Not Urgent"],
    status: "Not Started",
  },
  {
    imageUrl: image1.src,
    title: "Mastering UI Design for Impactful Experience",
    resourceType: "Article",
    tags: ["Prototyping", "Not Urgent"],
    status: "Not Started",
  },
  {
    imageUrl: image2.src,
    title: "Advanced UX Research Methods",
    resourceType: "Course",
    tags: ["Research", "Urgent"],
    status: "Not Started",
  },
  {
    imageUrl: image1.src,
    title: "Design Systems Fundamentals",
    resourceType: "Course",
    tags: ["Design", "Systems"],
    status: "Active",
  },
];

export default function NewEnrollment() {
  return (
    <section className="flex flex-col gap-3 relative">
      <div className="flex items-baseline justify-between">
        <SectionTitle
          description="Here you can see the courses you have enrolled in"
          title="New enrollment" 
          info="Here you can see the courses you have enrolled in" 
        />
        <button className="self-start sm:self-auto font-semibold underline-offset-[5px] border-b-2 border-blueLotus text-blueLotus hover:opacity-80 active:scale-95 transition-all duration-200 text-sm sm:text-base">
          View all
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyCourses.slice(0, 3).map((course, index) => (
          <CourseBox
            key={index}
            imageUrl={course.imageUrl}
            title={course.title}
            resourceType={course.resourceType}
            tags={course.tags}
            status={course.status}
          />
        ))}
      </div>
    </section>
  );
}
