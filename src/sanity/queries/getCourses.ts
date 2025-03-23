import { client } from "../lib/client";

export const getCourses = async () => 
  client.fetch(`*[_type == "course"] {
    ..., chapters[]-> {
      ..., lessons[]->
    }
  }`);

export const getCourseBySlug = async (slug: string) => {
  const courses = await client.fetch(
    `*[_type == "course" && slug.current == $slug] {
      ..., chapters[]-> {
        ..., lessons[]->
      }
    }`,
    { slug }
  );
  return courses[0];
}