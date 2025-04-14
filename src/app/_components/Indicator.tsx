// Define props for the component
type IndicatorProps = {
  chapterNumber?: number;
  lessonNumberInChapter?: number;
  totalLessonsInChapter?: number;
};

// This is now a simple Server Component (or can be used in Client Components too)
const Indicator = ({
  chapterNumber,
  lessonNumberInChapter,
  totalLessonsInChapter,
}: IndicatorProps) => {

  // Check if all required props are valid numbers
  const isValid =
    typeof chapterNumber === 'number' &&
    typeof lessonNumberInChapter === 'number' &&
    typeof totalLessonsInChapter === 'number';

  return (
    // Apply consistent styling whether showing data or fallback
    <div className="flex px-5 py-3 border-b items-center gap-2 text-sm text-gray-600">
      {isValid ? (
        // Use the desired format "Chapter X - Lesson Y of Z"
        `Chapter ${chapterNumber} - Lesson ${lessonNumberInChapter} of ${totalLessonsInChapter}`
      ) : (
        // Display a placeholder message when data is missing
        'Lesson position not available.'
      )}
    </div>
  );

  // Removed the explicit null return, the div always renders now.
};

export default Indicator;
