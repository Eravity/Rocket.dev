type IndicatorProps = {
  chapterNumber?: number;
  lessonNumberInChapter?: number;
  totalLessonsInChapter?: number;
  isLoading?: boolean;
  lessonTitle?: string | null;
};

const Indicator = ({
  chapterNumber,
  lessonNumberInChapter,
  totalLessonsInChapter,
  isLoading,
  lessonTitle,
}: IndicatorProps) => {
  const isValid =
    typeof chapterNumber === "number" &&
    typeof lessonNumberInChapter === "number" &&
    typeof totalLessonsInChapter === "number";

  let textContent: string;
  if (isLoading) {
    textContent = "Loading lesson position...";
  } else if (isValid) {
    // Only include position info, lesson title will be in a separate tag
    textContent = `Chapter ${chapterNumber} - Lesson ${lessonNumberInChapter} of ${totalLessonsInChapter}`;
  } else {
    textContent = "Lesson position not available.";
  }

  return (
    <div className="flex flex-col py-3">
      <h1 className="font-bold text-sm text-gray-600 h-5">{textContent}</h1>
      <h1 className="font-bold text-3xl mt-1 min-h-[36px]">{lessonTitle}</h1>
    </div>
  );
};

export default Indicator;
