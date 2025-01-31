export const parseTime = (timeStr: string): number => {
  if (timeStr.includes('h')) {
    const [hours, minutePart] = timeStr.split('h ');
    const minutes = minutePart ? parseInt(minutePart.replace('m', '')) : 0;
    return (parseInt(hours) * 60) + minutes;
  }
  return parseInt(timeStr.replace('m', ''));
};

export const calculateTimeSpent = (date: Date | string | number): number => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    console.warn('Invalid date provided');
    return 0;
  }
  
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - parsedDate.getTime()) / (1000 * 60));
  return Math.max(0, diffInMinutes);
};

export const formatTime = (minutes: number): string => {
  const hours = Math.ceil(minutes / 60); // Round up to nearest hour
  return `${hours}h`;
};
