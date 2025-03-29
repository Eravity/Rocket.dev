import { client } from "../lib/client";

export default async function getLesson(lessonSlug: string) {
  const lesson = await client.fetch(
    `*[_type == "lesson" && slug.current == $lessonSlug][0]{
      _id,
      title,
      slug,
      content,
      "chapter": chapter->{title, _id, slug}
    }`,
    { lessonSlug }
  );
  
  return lesson;
}
