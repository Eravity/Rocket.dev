import { client } from "../lib/client";

export default async function getLesson(articleId: string) {
  const lesson = await client.fetch(
    `*[_type == "lesson" && slug.current == $articleId][0]{
      _id,
      title,
      slug,
      content,
      "chapter": chapter->{title, _id, slug}
    }`,
    { articleId }
  );
  
  return lesson;
}
