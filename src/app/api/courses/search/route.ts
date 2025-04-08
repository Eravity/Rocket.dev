import { NextResponse } from "next/server";
import { client } from "../../../../sanity/lib/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const courseSlug = searchParams.get("courseSlug") || "";

  if (!query || !courseSlug) {
    return NextResponse.json({ results: [] });
  }

  // GROQ query to search through course content
  const groqQuery = `
    *[_type == "course" && slug.current == $courseSlug][0] {
      "chapters": chapters[] {
        _id,
        title,
        description,
        "lessons": lessons[] {
          _id,
          _key,
          title,
          "slug": slug.current,
          description,
          "matches": select(
            content match $searchText => true,
            pt::text(content) match $searchText => true,
            title match $searchText => true,
            description match $searchText => true,
            false
          )
        }
      }
    }
  `;

  try {
    const result = await client.fetch(groqQuery, {
      courseSlug,
      searchText: `*${query}*`,
    });

    // Filter to include only chapters with matching lessons
    interface Chapter {
      _id: string;
      id: string;
      title: string;
      description: string;
      isSanityChapter: boolean;
      content?: string;
      lessons?: Lesson[];
    }

    type SanityChapter = {
      _id: string;
      title: string;
      description: string;
      lessons: Lesson[];
    };

    interface Lesson {
      _id: string;
      _key?: string;
      title?: string;
      description?: string;
      content?: string;
      slug?: { current: string };
      matches?: boolean;
    }

    const filteredChapters = result?.chapters
      ?.map((chapter: SanityChapter, chapterIndex: number) => {
        const lessons =
          chapter.lessons?.filter((lesson) => lesson.matches) || [];
        if (lessons.length === 0) {
          return null;
        }

        const chapterData: Chapter = {
          _id: chapter._id || `chapter-${chapterIndex}`,
          id: chapter._id || `chapter-${chapterIndex}`,
          title: chapter.title || "Untitled Chapter",
          description: chapter.description || "",
          isSanityChapter: true,
          content: "",
          lessons: lessons,
        };
        return chapterData;
      })
      .filter((chapter: Chapter | null) => chapter !== null) as Chapter[];

    return NextResponse.json({
      results: filteredChapters || [],
    });
  } catch (error) {
    console.error("Error searching course content:", error);
    return NextResponse.json(
      { error: "Failed to search content" },
      { status: 500 }
    );
  }
}
