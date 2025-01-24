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
      <div className="flex gap-5">
        <CourseBox
          imageUrl={image1.src}
          title="Course Title"
          resourceType="video"
          tags={["tag1", "tag2"]}
          status="active"
        />

        <CourseBox
          imageUrl={image2.src}
          title="Course Title"
          resourceType="video"
          tags={["tag1", "tag2"]}
          status="active"
        />

        <CourseBox
          imageUrl={image1.src}
          title="Course Title"
          resourceType="video"
          tags={["tag1", "tag2"]}
          status="active"
        />
      </div>
    </section>
  );
}
