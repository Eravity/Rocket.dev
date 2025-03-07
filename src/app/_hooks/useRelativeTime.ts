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
  let diffInSeconds = Math.floor((target.getTime() - now.getTime()) / 1000);
  const isOverdue = diffInSeconds < 0;
  diffInSeconds = Math.abs(diffInSeconds);

  // Convert to days, hours, minutes
  const days = Math.floor(diffInSeconds / 86400);
  const hours = Math.floor((diffInSeconds % 86400) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  // Format the output
  if (days > 0) {
    return `${isOverdue ? '-' : ''}${days}d ${hours}h`;
  }
  if (hours > 0) {
    return `${isOverdue ? '-' : ''}${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${isOverdue ? '-' : ''}${minutes}m ${seconds}s`;
  }
  return `${isOverdue ? '-' : ''}${seconds}s`;
}
