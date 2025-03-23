import { client } from "../lib/client";

export const getCourses = async () => 
  client.fetch(`*[_type == "course"] {
    ..., chapters[]-> {
    ..., lessons[]-> }
    }`)