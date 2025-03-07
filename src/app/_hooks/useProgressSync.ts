import { useEffect, useRef } from "react";

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
  // Refs pentru a păstra cele mai recente valori
  const lastUpdateTimeRef = useRef(lastUpdateTime);
  const storedMinutesRef = useRef(storedMinutes);

  useEffect(() => {
    lastUpdateTimeRef.current = lastUpdateTime;
  }, [lastUpdateTime]);

  useEffect(() => {
    storedMinutesRef.current = storedMinutes;
  }, [storedMinutes]);

  // Efectul pentru schimbarea vizibilității paginii
  useEffect(() => {
    const handleVisibilityChange = () => {
      const now = new Date();
      console.debug("[ProgressSync] Document visibility changed:", document.visibilityState);
      if (document.visibilityState === "hidden" && isActive) {
        setLastUpdateTime(now);
        console.debug("[ProgressSync] Page hidden; updated lastUpdateTime:", now);
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
        // On resume, use the minutes saved in localStorage
        const localMinutes = Number(localStorage.getItem("todayMinutes")) || storedMinutes;
        console.debug("[ProgressSync] Page visible; elapsed minutes:", elapsed, "localMinutes:", localMinutes);
        if (elapsed >= 1) { // if at least a minute has passed during AFK, sync
          const newMinutes = localMinutes; // use persisted minutes
          updateMinutes.mutate({ id: progress.id, minutes: newMinutes });
          setStoredMinutes(newMinutes);
          setLastUpdateTime(now);
          localStorage.setItem("dailyGoalLastUpdateTime", now.toISOString());
          console.debug("[ProgressSync] Synced progress with newMinutes:", newMinutes);
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

  // Efectul de sincronizare la fiecare 30 de minute (fallback)
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
          console.debug("[ProgressSync] Fallback sync triggered; newMinutes:", newMinutes);
        }
      }
    }, 30 * 60 * 1000);
    return () => {
      clearInterval(interval);
      console.debug("[ProgressSync] Cleared fallback interval");
    };
  }, [
    isActive,
    progress,
    lastUpdateTime,
    storedMinutes,
    updateMinutes,
    setStoredMinutes,
    setLastUpdateTime,
  ]);

  // Efectul pentru sincronizarea datelor când pagina este părăsită
  useEffect(() => {
    const handlePageHide = () => {
      if (isActive && progress) {
        const currentMinutes = Number(localStorage.getItem("todayMinutes")) || storedMinutesRef.current;
        const url = "/api/sync-progress";
        const payload = JSON.stringify({
          id: progress.id,
          minutes: currentMinutes
        });
        const blob = new Blob([payload], { type: "application/json" });
        if (navigator.sendBeacon) {
          navigator.sendBeacon(url, blob);
        } else {
          fetch(url, { method: "POST", body: payload, keepalive: true });
        }
        console.debug("[ProgressSync] Final sync with minutes:", currentMinutes);
      }
    };
    window.addEventListener("pagehide", handlePageHide);
    return () => window.removeEventListener("pagehide", handlePageHide);
  }, [isActive, progress]);
}
