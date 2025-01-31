import { calculateTimeSpent, formatTime } from '../utils/timeUtils';

export interface Content {
  title: string;
  type?: string;
  completition: number;
  timeSpent: string | Date; // Allow both string and Date types
}

export const useContentManager = (contents: Content[]) => {
  // Calculate minutes once for each content
  const contentsWithMinutes = contents.map(content => ({
    ...content,
    minutes: calculateTimeSpent(content.timeSpent)
  }));

  // Calculate total minutes once
  const totalMinutes = contentsWithMinutes.reduce(
    (acc, curr) => acc + curr.minutes, 
    0
  );

  // Calculate stats using the stored minutes
  const contentsWithStats = contentsWithMinutes.map(content => ({
    ...content,
    timeSpent: formatTime(content.minutes),
    displayPercentage: Math.floor((content.minutes / totalMinutes) * 100) // Changed to floor
  }));

  // Sort by actual minutes spent
  const sortedRegular = [...contentsWithStats]
    .sort((a, b) => b.minutes - a.minutes)
    .slice(0, 2);

  // Calculate remaining percentage directly from total
  const topContentPercentage = sortedRegular.reduce(
    (acc, curr) => acc + curr.displayPercentage, 
    0
  );

  // Other percentage is whatever is left to reach 100%
  const otherPercentage = 100 - topContentPercentage;

  const totalOtherMinutes = contentsWithMinutes
    .filter(item => !sortedRegular.some(sorted => sorted.title === item.title))
    .reduce((acc, curr) => acc + curr.minutes, 0);

  return {
    topContent: sortedRegular,
    otherContent: {
      title: "Other",
      completition: 0,
      displayPercentage: otherPercentage,
      timeSpent: formatTime(totalOtherMinutes)
    }
  };
};
