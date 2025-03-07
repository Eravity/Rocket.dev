"use client";
import { useIntlDateTime } from "../_hooks/intl";
import { useEffect, useState } from "react";

export default function DateAndTime() {
  const { formatTime } = useIntlDateTime();

  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!currentDate) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="flex gap-1 items-center font-semibold text-neutral-500">
        {formatTime(currentDate)}
      </h1>
    </div>
  );
}
