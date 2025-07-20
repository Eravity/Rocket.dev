import {useEffect} from "react";

export default function useScrollComplete(
  ref: React.RefObject<HTMLElement | null>,
  onComplete: () => void,
  offsetBottom = 150
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const scrolledToBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - offsetBottom;

      if (scrolledToBottom) {
        onComplete();
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [ref, onComplete, offsetBottom]);
}
