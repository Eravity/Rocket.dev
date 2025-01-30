import { calculateTimeSpent, formatTime } from '../utils/timeUtils';

export interface Content {
  title: string;
  type?: string;
  completition: number;
  timeSpent: Date;
}

const validateCompletions = (contents: Content[]): boolean => {
  const total = contents.reduce((sum, content) => sum + content.completition, 0);
  if (total !== 100) {
    console.warn(`Total completion should be 100%, current total is ${total}%`);
    return false;
  }
  return true;
};

export const useContentManager = (contents: Content[]) => {
  // Validate completions
  validateCompletions(contents);

  // Ensure all completion values are between 0 and 100
  contents.forEach(content => {
    if (content.completition < 0 || content.completition > 100) {
      throw new Error(`Invalid completion value for ${content.title}: ${content.completition}%`);
    }
  });

  const sortedRegular = [...contents]
    .sort((a, b) => b.completition - a.completition)
    .slice(0, 2)
    .map(content => ({
      ...content,
      timeSpent: formatTime(calculateTimeSpent(content.timeSpent))
    }));

  const remainingContent = contents.filter(
    (item) => !sortedRegular.some(sorted => sorted.title === item.title)
  );

  // Înlocuim media cu suma totală
  const totalCompletion = remainingContent.reduce(
    (acc, curr) => acc + curr.completition, 
    0
  );
  
  const totalMinutes = remainingContent
    .reduce((acc, curr) => acc + calculateTimeSpent(curr.timeSpent), 0);

  return {
    topContent: sortedRegular,
    otherContent: {
      title: "Other",
      completition: totalCompletion, // folosim suma în loc de medie
      timeSpent: formatTime(totalMinutes)
    }
  };
};
