  useEffect(() => {
    const fetchLesson = async () => {
      if (!lessonSlug) return;

      try {
        setIsLessonLoading(true);
        const lesson = await getLesson(lessonSlug);

        if (!lesson) {
          notFound();
        }

        setLessonContent(lesson.content);
      } catch (error) {
        // Silently handle error and set loading to false
        setIsLessonLoading(false);
      } finally {
        setIsLessonLoading(false);
      }
    };
