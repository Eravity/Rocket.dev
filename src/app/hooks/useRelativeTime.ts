import { useState, useEffect } from "react";

export function useRelativeTime({ dateString }: { dateString: string }): string {
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

  if (diffInSeconds >= 86400) {
    return `${Math.floor(diffInSeconds / 86400)} ${Math.floor(diffInSeconds / 86400) > 1 ? "Days" : "Day"}`;
  }
  if (diffInSeconds >= 3600) {
    return `${Math.floor(diffInSeconds / 3600)} ${Math.floor(diffInSeconds / 3600) > 1 ? "Hours" : "Hour"}`;
  }
  return `${Math.floor(diffInSeconds / 60)} min ${diffInSeconds % 60} sec`;
}
