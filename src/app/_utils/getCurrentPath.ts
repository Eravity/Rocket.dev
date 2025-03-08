import { usePathname } from "next/navigation";

export default function useCurrentPath() {
  const currentPathname = usePathname();
  
  // Process the path to filter out segments that don't have corresponding pages
  const processPath = () => {
    const segments = currentPathname.split("/").filter(Boolean);
    return segments.filter(segment => {
      // Filter out segments like "course", "article" that would cause 404s
      return !["course", "article"].includes(segment.toLowerCase());
    });
  };
  
  return {
    raw: currentPathname,
    segments: processPath()
  };
}
