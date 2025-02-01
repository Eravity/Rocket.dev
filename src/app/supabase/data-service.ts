import { supabase } from "./supabase";

export const getCourses = async () => {
  const { data, error } = await supabase.from("courses").select("*");

  console.log(data);

  if (error) {
    throw new Error(`There was an error getting courses: ${error.message}`);
  }

  return data;
};