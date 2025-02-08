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

  // Efectul pentru sincronizarea datelor când pagina este părăsită
  useEffect(() => {
    const handlePageHide = () => {
      if (isActive && progress) {
        const now = new Date();
        // Dacă lastUpdateTime nu este setat, folosim momentul curent
        const effectiveLastUpdateTime = lastUpdateTimeRef.current || now;
        const elapsed = Math.floor(
          (now.getTime() - effectiveLastUpdateTime.getTime()) / (1000 * 60)
        );
        if (elapsed > 0) {
          const url = "/api/sync-progress"; // endpoint-ul pentru sincronizare
          const newMinutes = storedMinutesRef.current + elapsed;
          const payload = JSON.stringify({
            id: progress.id,
            minutes: newMinutes,
          });
          // Creăm un Blob cu tipul corect
          const blob = new Blob([payload], { type: "application/json" });
          if (navigator.sendBeacon) {
            navigator.sendBeacon(url, blob);
          } else {
            fetch(url, { method: "POST", body: payload, keepalive: true });
          }
        }
      }
    };
    window.addEventListener("pagehide", handlePageHide);
    return () => window.removeEventListener("pagehide", handlePageHide);
  }, [isActive, progress]);
}
