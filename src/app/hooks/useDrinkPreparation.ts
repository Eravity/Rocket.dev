import { useState, useEffect } from "react";

export type DrinkItem = {
  src: string;
  alt: string;
};

export type PreparationStatus =
  | "selecting"
  | "preparing"
  | "ready"
  | "cooldown";

export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export default function useDrinkPreparation() {
  const [selectedDrink, setSelectedDrink] = useState<DrinkItem | null>(null);
  const [status, setStatus] = useState<PreparationStatus>("selecting");
  const [countdown, setCountdown] = useState<number>(7200);
  const [storedTime, setStoredTime] = useState<number | null>(null);

  useEffect(() => {
    if (selectedDrink) {
      setStatus("preparing");
      const preparingTimer = setTimeout(() => {
        setStatus("ready");

        const readyTimer = setTimeout(() => {
          setStatus("cooldown");
          const now = Date.now();
          localStorage.setItem("nextDrinkTime", (now + 7200000).toString());
          setStoredTime(now + 7200000);
        }, 2000);

        return () => clearTimeout(readyTimer);
      }, 3000);

      return () => clearTimeout(preparingTimer);
    }
  }, [selectedDrink]);

  useEffect(() => {
    if (status === "cooldown") {
      const timer = setInterval(() => {
        const now = Date.now();
        const stored =
          storedTime || parseInt(localStorage.getItem("nextDrinkTime") || "0");
        const remaining = Math.max(0, Math.floor((stored - now) / 1000));

        if (remaining <= 0) {
          setStatus("selecting");
          setSelectedDrink(null);
          localStorage.removeItem("nextDrinkTime");
          setStoredTime(null);
          clearInterval(timer);
        } else {
          setCountdown(remaining);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status, storedTime]);

  useEffect(() => {
    const stored = localStorage.getItem("nextDrinkTime");
    if (stored) {
      const remaining = parseInt(stored) - Date.now();
      if (remaining > 0) {
        setStatus("cooldown");
        setStoredTime(parseInt(stored));
      } else {
        localStorage.removeItem("nextDrinkTime");
      }
    }
  }, []);

  return {
    selectedDrink,
    status,
    countdown,
    handleDrinkSelect: setSelectedDrink,
  };
}
