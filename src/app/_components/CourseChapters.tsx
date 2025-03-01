import { getChapters, getChapterArticles } from "../supabase/data-service";
import Accordion from "./Accordion";
import Link from "next/link";

type CourseChaptersProps = {
  course: {
    id: number;
    title: string;
    image: string;
  };
};

type Article = {
  id: number;
  title: string;
  chapter_id: number;
};

export default async function CourseChapters({ course }: CourseChaptersProps) {
  const chapters = await getChapters(course.id);

  // Create accordion items with articles for each chapter
  const accordionItems = await Promise.all(
    chapters.map(async (chapter) => {
      const chapterArticles = (await getChapterArticles(
        chapter.id
      )) as Article[];

      return {
        id: chapter.id || chapter.title,
        title: chapter.title,
        content: (
          <ul className="">
            {chapterArticles.length > 0 ? (
              chapterArticles.map((article: Article, index) => (
                <li
                  key={article.id}
                  className={`py-4 ${
                    index < chapterArticles.length - 1 ? "border-b " : ""
                  }`}
                >
                  <Link
                    href={`/course/${course.id}/article/${article.id}`}
                    className="hover:text-blue-500"
                  >
                    {article.title}
                  </Link> 
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No articles available for this chapter.
              </p>
            )}
          </ul>
        ),
      };
    })
  );

  return <Accordion items={accordionItems} />;
}
