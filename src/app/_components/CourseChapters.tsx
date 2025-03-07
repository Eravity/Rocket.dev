"use client";

import { useEffect, useState } from "react";
import Accordion from "./Accordion";
import { getChapters, getChapterArticles } from "@/app/_supabase/data-service";
import Link from "next/link";

type Chapter = {
  id: number;
  title: string;
  course_id: number;
  order_number?: number;
  description?: string;
};

type Article = {
  id: number;
  title: string;
  chapter_id: number;
  order_number?: number;
};

type ChapterWithArticles = Chapter & {
  articles: Article[];
};

type CourseChaptersProps = {
  course: { id: number; title: string };
};

export default function CourseChapters({ course }: CourseChaptersProps) {
  const [accordionItems, setAccordionItems] = useState<
    {
      id: number;
      title: string;
      content: React.ReactElement;
      chapterId: number;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalChapters, setTotalChapters] = useState(0);

  useEffect(() => {
    const fetchChaptersAndArticles = async () => {
      if (!course?.id) return;

      try {
        setIsLoading(true);
        const chaptersData = await getChapters(course.id);
        setTotalChapters(chaptersData.length);

        // Fetch articles for each chapter
        const chaptersWithArticlesData = await Promise.all(
          chaptersData.map(async (chapter: Chapter) => {
            const articles = await getChapterArticles(chapter.id);
            return { ...chapter, articles };
          })
        );

        // Calculate total number of articles
        let articleCount = 0;
        chaptersWithArticlesData.forEach((chapter) => {
          articleCount += chapter.articles.length;
        });
        setTotalArticles(articleCount);

        // Transform chapters into accordion items with article lists
        const items = chaptersWithArticlesData.map(
          (chapter: ChapterWithArticles) => ({
            id: chapter.id,
            title: chapter.title,
            content: (
              <div className="">
                {chapter.articles.length > 0 ? (
                  <ul className="">
                    {chapter.articles.map((article, index) => (
                      <li
                        key={article.id}
                        className={`${
                          index < chapter.articles.length - 1
                            ? "border-b border-neutral-200"
                            : ""
                        }`}
                      >
                        <Link
                          href={`/course/${course.id}/article/${article.id}`}
                          className="flex items-center px-6 py-5 hover:bg-gray-100 transition-colors"
                        >
                          <div
                            className={`mr-4 flex-shrink-0 w-6 h-6 bg-neutral-200 rounded-full flex items-center justify-center text-xs font-medium text-neutral-600`}
                          >
                            {article.order_number || "•"}
                          </div>
                          <span className="text-black">{article.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic px-2">
                    No articles available for this chapter.
                  </p>
                )}
              </div>
            ),
            chapterId: chapter.id,
          })
        );

        setAccordionItems(items);
      } catch (error) {
        console.error("Error fetching chapters and articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChaptersAndArticles();
  }, [course]);

  if (isLoading) {
    return (
      <div className="w-full text-center py-8">
        <div className="inline-block animate-pulse">Loading chapters...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Course Chapters</h2>
        <div className="text-sm text-gray-600">
          <span className="font-medium">{totalChapters} chapters</span>
          <span className="mx-2">•</span>
          <span className="font-medium">{totalArticles} articles</span>
        </div>
      </div>
      {accordionItems.length > 0 ? (
        <Accordion items={accordionItems} defaultAllOpen={true} />
      ) : (
        <p className="text-center py-4 text-gray-500">
          No chapters available for this course.
        </p>
      )}
    </div>
  );
}
