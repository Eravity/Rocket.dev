import React, {useEffect, useRef as useRefHook} from "react";

export default function useScrollComplete(
  ref: React.RefObject<HTMLElement | null>,
  onComplete: () => void,
  offsetBottom = 150,
) {
  // Use a ref to track if completion has already happened
  const hasCompleted = useRefHook<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reset completion status when dependencies change
    hasCompleted.current = false;

    const handleScroll = () => {
      // Skip if already completed
      if (hasCompleted.current) return;

      const scrolledToBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - offsetBottom;

      if (scrolledToBottom) {
        hasCompleted.current = true;
        onComplete();
      }
    };

    // Check scroll position immediately on mount
    setTimeout(() => {
      handleScroll();
    }, 300); // Small delay to ensure content is fully rendered

    el.addEventListener("scroll", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [ref, onComplete, offsetBottom, hasCompleted]);
}
