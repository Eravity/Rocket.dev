import { CourseBox } from "./CourseBox";
import InfoSign from "./InfoSign";
import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";

export default function NewEnrollment() {
  return (
    <section className="flex flex-col">
      <div className="flex gap-2 items-baseline">
        <h1 className="font-bold text-lg mb-4">New enrollment</h1>
        <InfoSign info="Here are the courses you enrolled in" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CourseBox
          imageUrl={image1.src}
          title="Enhancing Learning Engagement Through Thoughtful UX/UI"
          resourceType="Course"
          tags={["Prototyping", "Urgent"]}
          status="Active"
        />

        <CourseBox
          imageUrl={image2.src}
          title="UX/UI 101 - For Beginners to be great and good Designer"
          resourceType="Article"
          tags={["Prototyping", "Not Urgent"]}
          status="Not Started"
        />

        <CourseBox
          imageUrl={image1.src}
          title="Mastering UI Design for Impactful Experience"
          resourceType="Article"
          tags={["Prototyping", "Not Urgent"]}
          status="Not Started"
        />
      </div>
    </section>
  );
}
