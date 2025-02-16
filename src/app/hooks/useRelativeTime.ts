import { useState, useEffect } from "react";

export function useRelativeTime({
  dateString,
}: {
  dateString: string;
}): string {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(dateString));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(dateString));
    }, 1000);

    return () => clearInterval(interval);
  }, [dateString]);

  return timeLeft;
}

function calculateTimeLeft(dateString: string): string {
  const now = new Date();
  const target = new Date(dateString);
  const diffInSeconds = Math.floor((target.getTime() - now.getTime()) / 1000);

  const days = Math.floor(diffInSeconds / 86400);
  const hours = Math.floor((diffInSeconds % 86400) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);

  if (days >= 1) {
    return `${days} ${days > 1 ? "Days" : "Day"} ${hours} ${
      hours !== 1 ? "Hours" : "Hour"
    }`;
  }
  if (hours >= 1) {
    return `${hours} ${hours !== 1 ? "Hours" : "Hour"} ${minutes} ${
      minutes !== 1 ? "min" : "min"
    }`;
  }
  return `${Math.abs(minutes)} min`;
}
