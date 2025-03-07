import { usePathname } from "next/navigation";

export default function useCurrentPath() {
  const currentPathname = usePathname();
  return currentPathname;
}
