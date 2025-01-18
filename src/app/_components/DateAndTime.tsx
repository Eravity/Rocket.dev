"use client";
import { useIntlDateTime } from "../hooks/intl";
import { useEffect, useState } from "react";

export default function DateAndTime() {
  const { formatTime } = useIntlDateTime();

  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!currentDate) {
    return null;
  }

  return (
    <div className="flex flex-col items-center border">
      <h1 className="font-semibold text-neutral-500">
        {formatTime(currentDate)}
      </h1>
    </div>
  );
}
