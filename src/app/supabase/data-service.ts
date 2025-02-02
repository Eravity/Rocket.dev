import { supabase } from "./supabase";

export const getCourses = async () => {
  const { data, error } = await supabase.from("courses").select("*");

  if (error)
    throw new Error(`There was an error getting courses: ${error.message}`);

  return data;
};

export const getChapters = async () => {
  const { data: chapters, error } = await supabase.from("chapters").select("*");

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

export const getCoursesWithChapters = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select("*, chapters(*)");

  if (error)
    throw new Error(`Error fetching courses with chapters: ${error.message}`);

  return data;
};
