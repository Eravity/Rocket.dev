import { calculateTimeSpent, formatTime } from '../utils/timeUtils';

export interface Content {
  title: string;
  type?: string;
  completition: number;
  timeSpent: string | Date; 
}

export const useContentManager = (contents: Content[]) => {

  const contentsWithMinutes = contents.map(content => ({
    ...content,
    minutes: calculateTimeSpent(content.timeSpent)
  }));

  const totalMinutes = contentsWithMinutes.reduce(
    (acc, curr) => acc + curr.minutes, 
    0
  );
  
  const contentsWithStats = contentsWithMinutes.map(content => ({
    ...content,
    timeSpent: formatTime(content.minutes),
    displayPercentage: Math.floor((content.minutes / totalMinutes) * 100)
  }));

  const sortedRegular = [...contentsWithStats]
    .sort((a, b) => b.minutes - a.minutes)
    .slice(0, 2);

  const topContentPercentage = sortedRegular.reduce(
    (acc, curr) => acc + curr.displayPercentage, 
    0
  );

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
