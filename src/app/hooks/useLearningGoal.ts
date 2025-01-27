import { useState, useEffect } from 'react';
import { useIntlDateTime } from './intl';
import { useLearningEvent } from './useLearningEvent';

type LearningGoalState = {
  isActive: boolean;
  currentProgress: number;
  totalGoal: number;
  todayMinutes: number;
  streak: {
    days: number;
    startDate: Date;
    endDate: Date;
  };
};

const STORAGE_KEY = 'learning-progress';

const getStoredProgress = () => {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    // Convert stored date strings back to Date objects
    return {
      ...parsed,
      streak: {
        ...parsed.streak,
        startDate: new Date(parsed.streak.startDate),
        endDate: new Date(parsed.streak.endDate)
      }
    };
  } catch (e) {
    console.error('Error parsing stored progress:', e);
    return null;
  }
};

export const useLearningGoal = (initialGoal: number = 30) => {
  const { formatDate } = useIntlDateTime();
  const { subscribe } = useLearningEvent();
  
  const [state, setState] = useState<LearningGoalState>(() => {
    return getStoredProgress() || {
      isActive: false,
      currentProgress: 0,
      totalGoal: initialGoal,
      todayMinutes: 0,
      streak: {
        days: 1,
        startDate: new Date(),
        endDate: new Date(),
      },
    };
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.isActive) {
      interval = setInterval(() => {
        setState(prev => {
          const newMinutes = prev.todayMinutes + 1;
          return {
            ...prev,
            todayMinutes: newMinutes,
            currentProgress: newMinutes,
          };
        });
      }, 60000); // Update every minute
    }

    return () => clearInterval(interval);
  }, [state.isActive]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Add event listener effect
  useEffect(() => {
    const unsubscribe = subscribe((type) => {
      switch (type) {
        case 'start':
          startLearning();
          break;
        case 'pause':
          pauseLearning();
          break;
        case 'reset':
          resetProgress();
          break;
      }
    });

    return () => unsubscribe();
  }, []);

  const startLearning = () => {
    setState(prev => ({ ...prev, isActive: true }));
  };

  const pauseLearning = () => {
    setState(prev => ({ ...prev, isActive: false }));
  };

  const resetProgress = () => {
    setState(prev => ({
      ...prev,
      isActive: false,
      todayMinutes: 0,
      currentProgress: 0,
    }));
  };

  return {
    ...state,
    startLearning,
    pauseLearning,
    resetProgress,
    progressPercentage: state.todayMinutes,
    formattedDates: {
      startDate: formatDate(state.streak.startDate),
      endDate: formatDate(state.streak.endDate)
    }
  };
};
