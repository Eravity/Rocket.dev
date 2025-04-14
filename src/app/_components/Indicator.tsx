type IndicatorProps = {
  chapterNumber?: number;
  lessonNumberInChapter?: number;
  totalLessonsInChapter?: number;
  isLoading?: boolean; 
};

const Indicator = ({
  chapterNumber,
  lessonNumberInChapter,
  totalLessonsInChapter,
  isLoading, 
}: IndicatorProps) => {

  const isValid =
    typeof chapterNumber === "number" &&
    typeof lessonNumberInChapter === "number" &&
    typeof totalLessonsInChapter === "number";

  let textContent: string;
  if (isLoading) {
    textContent = "Loading lesson position...";
  } else if (isValid) {
    textContent = `Chapter ${chapterNumber} - Lesson ${lessonNumberInChapter} of ${totalLessonsInChapter}`;
  } else {
    textContent = "Lesson position not available.";
  }

  return (
    <div className="flex py-3 font-semibold items-center text-sm text-gray-600">
      {textContent}
    </div>
  );
};

export default Indicator;
