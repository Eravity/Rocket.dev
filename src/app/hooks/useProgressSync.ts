import { useEffect } from "react";

interface Progress {
  id: string;
  created_at: string;
}

interface ProgressSyncProps {
  isActive: boolean;
  progress: Progress;
  lastUpdateTime: Date | null;
  storedMinutes: number;
  updateMinutes: { mutate: (data: { id: string; minutes: number }) => void };
  setStoredMinutes: (num: number) => void;
  setLastUpdateTime: (time: Date) => void;
}

export function useProgressSync({
  isActive,
  progress,
  lastUpdateTime,
  storedMinutes,
  updateMinutes,
  setStoredMinutes,
  setLastUpdateTime,
}: ProgressSyncProps) {
  // Visibility change effect
  useEffect(() => {
    const handleVisibilityChange = () => {
      const now = new Date();
      if (document.visibilityState === "hidden" && isActive) {
        setLastUpdateTime(now);
      }
      if (
        document.visibilityState === "visible" &&
        isActive &&
        progress &&
        lastUpdateTime
      ) {
        const elapsed = Math.floor(
          (now.getTime() - lastUpdateTime.getTime()) / (1000 * 60)
        );
        if (elapsed >= 10) {
          const progressDate = new Date(progress.created_at);
          const newMinutes =
            now.toDateString() !== progressDate.toDateString()
              ? 0
              : storedMinutes + elapsed;
          updateMinutes.mutate({ id: progress.id, minutes: newMinutes });
          setStoredMinutes(newMinutes);
          setLastUpdateTime(now);
          localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
          localStorage.setItem("todayMinutes", newMinutes.toString());
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [
    isActive,
    progress,
    lastUpdateTime,
    storedMinutes,
    updateMinutes,
    setStoredMinutes,
    setLastUpdateTime,
  ]);

  // Fallback sync effect every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive && progress && lastUpdateTime) {
        const now = new Date();
        const elapsed = Math.floor(
          (now.getTime() - lastUpdateTime.getTime()) / (1000 * 60)
        );
        if (elapsed >= 30) {
          const newMinutes = storedMinutes + elapsed;
          updateMinutes.mutate({ id: progress.id, minutes: newMinutes });
          setStoredMinutes(newMinutes);
          setLastUpdateTime(now);
          localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
          localStorage.setItem("todayMinutes", newMinutes.toString());
          console.info("Fallback sync: 30+ minutes elapsed, data updated");
        }
      }
    }, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [
    isActive,
    progress,
    lastUpdateTime,
    storedMinutes,
    updateMinutes,
    setStoredMinutes,
    setLastUpdateTime,
  ]);

  // Beforeunload effect
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isActive && progress && lastUpdateTime) {
        const now = new Date();
        const elapsed = Math.floor(
          (now.getTime() - lastUpdateTime.getTime()) / (1000 * 60)
        );
        if (elapsed > 0) {
          const url = "/api/sync-progress"; // endpoint to sync progress
          const data = JSON.stringify({
            id: progress.id,
            minutes: storedMinutes + elapsed,
          });
          if (navigator.sendBeacon) {
            navigator.sendBeacon(url, data);
          } else {
            fetch(url, { method: "POST", body: data, keepalive: true });
          }
        }
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isActive, progress, lastUpdateTime, storedMinutes]);
}
