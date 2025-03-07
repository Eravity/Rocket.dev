import { usePathname } from "next/navigation";

export default function useCurrentPath(): string {
  return usePathname();
}