import { getCourseBySlug } from "@/sanity/queries/getCourses";
import CourseHeader from "@/app/_components/CourseHeader";
import CertificateBanner from "@/app/_components/CertificateBanner";
import CourseDescription from "@/app/_components/CourseDescription";
import CourseContent from "@/app/_components/CourseContent";
import Accordion from "@/app/_components/Accordion";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    // No need to await params, it's already an object
    const { slug } = params;
    const course = await getCourseBySlug(slug);
    if (!course) {
		return {
			title: "Course Not Found",
		};
	}
    return {
		title: `${course.title} | Rocket.dev Learning`,
		description: course.description || "Learn with Rocket.dev",
	};
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params; // Removed 'await' as params is not a promise
    const course = await getCourseBySlug(slug);
    if (!course) {
		notFound();
	}

    // Extra safety check for chapters
    if (!course.chapters) {
		course.chapters = [];
	}

    // More robust chapter processing with error handling
    const courseChapters = [];
    try {
		if (Array.isArray(course.chapters)) {
			let chapterIndex = 0;
			for (const chapter of course.chapters) {
				interface Lesson {
					_id: string;
					_key?: string;
					title?: string;
					description?: string;
					content?: string;
					slug?: { current: string };
				}

				const lessons = Array.isArray(chapter.lessons)
					? chapter.lessons.map((lesson: Lesson, lessonIndex: number) => ({
							_key: lesson._key || `lesson-${lessonIndex}`,
							title: lesson.title || "Untitled Lesson",
							description: lesson.description || "",
							content: lesson.content || "",
							_id: lesson._id,
							slug: lesson.slug?.current || `lesson-${lessonIndex}`,
					  }))
					: [];
				courseChapters.push({
					_id: chapter._id || `chapter-${chapterIndex}`,
					id: chapter._id || `chapter-${chapterIndex}`,
					title: chapter.title || "Untitled Chapter",
					description: chapter.description || "",
					isSanityChapter: true,
					content: chapter.content || "",
					lessons: lessons,
				});
				chapterIndex++;
			}
		}
	} catch (error) {
		console.error("Error processing chapters:", error);
	}

    const serializedCourse = {
		_id: course._id || "",
		id: course._id || "",
		_type: course._type || "",
		title: course.title || "Untitled Course",
		description: course.description || "",
		content_type: course.content_type || "",
		tags: Array.isArray(course.tags) ? course.tags : [],
		chapters: courseChapters,
		slug: course.slug?.current || slug,
		isSanityCourse: true,
		image: course.image || null,
		thumbnail: course.thumbnail || null,
		banner: course.banner || null,
	};

    const accordionItems = courseChapters.map((chapter) => ({
		id: chapter.id,
		title: chapter.title,
		content: (
			<div className="px-4">
				{chapter.description && <p className="mb-4">{chapter.description}</p>}
				{chapter.lessons && Array.isArray(chapter.lessons) && chapter.lessons.length > 0 ? (
					<div>
						<ul className="space-y-3">
							{chapter.lessons.map((lesson, index) => (
								<li
									key={lesson._key || index}
									className={`pl-2 ${index < chapter.lessons.length - 1 ? "border-b border-gray-300" : ""}`}
								>
									<Link href={`/learning/course/${slug}/lesson/${lesson.slug}`}>
										<h1 className="font-medium my-4">{lesson.title}</h1>
									</Link>
									{lesson.description && <p className="text-sm text-gray-600">{lesson.description}</p>}
								</li>
							))}
						</ul>
					</div>
				) : chapter.content ? (
					<div className="mt-3">{chapter.content}</div>
				) : (
					<p className="text-gray-500 my-4 italic">This chapter has no content yet.</p>
				)}
			</div>
		),
		chapterId: chapter.id,
		isSanityChapter: true,
		lessonCount: Array.isArray(chapter.lessons) ? chapter.lessons.length : 0,
	}));

    return (
		<main className="flex flex-col space-y-16">
			<CourseHeader
				id={serializedCourse._id}
				course={serializedCourse}
				contentType={serializedCourse._type}
				tags={serializedCourse.tags}
				isSanityCourse={true}
			/>
			<section className="container mx-auto flex flex-col lg:flex-row gap-8 lg:gap-14 px-4 md:px-6 2xl:px-16">
				<div className="w-full lg:w-9/12 flex flex-col gap-10 lg:gap-14">
					<CourseDescription description={serializedCourse.description} />
					<CertificateBanner />
					<div className="flex flex-col gap-6">
						<Accordion items={accordionItems} />
					</div>
				</div>
				<div className="w-full lg:w-3/12">
					<CourseContent />
				</div>
			</section>
		</main>
	);
}
