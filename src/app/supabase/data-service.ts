import { supabase } from "./supabase";

export const getCourses = async () => {
  const { data, error } = await supabase.from("courses").select("*");

  if (error)
    throw new Error(`There was an error getting courses: ${error.message}`);

  return data;
};

export const getChapters = async (courseId: number) => {
  const { data: chapters, error } = await supabase
    .from("chapters")
    .select("*")
    .eq("course_id", courseId);

  if (error)
    throw new Error(`There was an error getting chapters: ${error.message}`);

  return chapters;
};

export const getCourseChapters = async (courseId: number) => {
  const { data, error } = await supabase
    .from("chapters")
    .select("*")
    .eq("course_id", courseId);

  if (error)
    throw new Error(`There was an error getting chapters: ${error.message}`);

  return data.length;
};

export const getCourse = async (courseId: number) => {
  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId);

  if (error)
    throw new Error(`There was an error getting course: ${error.message}`);

  return course;
};

export const getCoursesWithChapters = async (courseId: number) => {
  const { data, error } = await supabase
    .from("courses")
    .select("*, chapters(*)")
    .eq("id", courseId);

  if (error)
    throw new Error(`Error fetching courses with chapters: ${error.message}`);

  return data;
};

export const getLearningProgress = async () => {
  const { data: learning_progress, error } = await supabase
    .from("learning_progress")
    .select(
      "id, streak_start, streak_end, streak_days, total_goal, today_minutes, progress_percentage, created_at"
    ); // Added id

  if (error)
    throw new Error(
      `There was an error getting learning progress: ${error.message}`
    );

  return learning_progress;
};

export const updateTodayMinutes = async (id: string, newMinutes: number) => {
  const { data, error } = await supabase
    .from("learning_progress")
    .update({ today_minutes: newMinutes })
    .match({ id });
  if (error) throw new Error(`Error updating today_minutes: ${error.message}`);
  return data;
};

export const ensureLearningProgress = async () => {
  // Get the latest record
  const { data, error } = await supabase
    .from("learning_progress")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);
  if (error)
    throw new Error(`Error fetching learning progress: ${error.message}`);
  const now = new Date();
  if (data && data.length > 0) {
    const lastRecord = data[0];
    const streakEnd = new Date(lastRecord.streak_end);
    const diffDays = Math.floor(
      (now.getTime() - streakEnd.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays > 0) {
      // if a new day
      const { data: newRecord, error: insertError } = await supabase
        .from("learning_progress")
        .insert([
          {
            user_id: "e4f7f29e-fb4f-4e42-8e14-c8b882c39e07",
            total_goal: 30,
          },
        ]);
      if (insertError)
        throw new Error(
          `Error inserting new learning progress: ${insertError.message}`
        );
      return newRecord;
    }
    return lastRecord;
  } else {
    // No record exists; create one.
    const { data: newRecord, error: insertError } = await supabase
      .from("learning_progress")
      .insert([
        {
          user_id: "e4f7f29e-fb4f-4e42-8e14-c8b882c39e07",
          total_goal: 30,
        },
      ]);
    if (insertError)
      throw new Error(
        `Error inserting new learning progress: ${insertError.message}`
      );
    return newRecord;
  }
};

export const getContentType = async (contentRefId: number) => {
  const { data: content, error } = await supabase
    .from("contents")
    .select("type")
    .eq("id", contentRefId)
    .maybeSingle();

  if (error) throw new Error(`Error fetching content types: ${error.message}`);

  return content?.type;
};

export const getCourseTags = async (id: number) => {
  const { data, error } = await supabase
    .from("courses")
    .select("tags")
    .eq("id", id);
  if (error) throw new Error(`Error fetching course tags: ${error.message}`);

  return data;
};
