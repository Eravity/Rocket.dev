import { useEffect, useRef } from "react";

export function useInactivityTracker(
  isActive: boolean,
  autoPaused: boolean,
  setAutoPaused: (paused: boolean) => void,
  setLastUpdateTime: (time: Date) => void
) {
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetInactivity = (e?: Event) => {
      if (e && autoPaused) {
        console.debug("[InactivityTracker] Activity detected:", e.type, "- Timer resumed");
        setAutoPaused(false);
        setLastUpdateTime(new Date());
      }
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => {
        if (isActive && !autoPaused) {
          console.debug("[InactivityTracker] User inactive for 1 minute - Timer paused");
          setAutoPaused(true);
        }
      }, 60000); // 1 minute timeout
    };
    document.addEventListener("mousemove", resetInactivity);
    document.addEventListener("mousedown", resetInactivity);
    document.addEventListener("scroll", resetInactivity);
    document.addEventListener("touchstart", resetInactivity);
    return () => {
      document.removeEventListener("mousemove", resetInactivity);
      document.removeEventListener("mousedown", resetInactivity);
      document.removeEventListener("scroll", resetInactivity);
      document.removeEventListener("touchstart", resetInactivity);
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [autoPaused, isActive, setLastUpdateTime, setAutoPaused]);
}
