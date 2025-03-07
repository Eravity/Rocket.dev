'use client';

import { useState, useEffect } from 'react';

interface LearningState {
  hasStartedToday: boolean;
  isPaused: boolean;
  lastActiveDate: string;
}

export const useLearningState = () => {
  const [learningState, setLearningState] = useState<LearningState>({
    hasStartedToday: false,
    isPaused: false,
    lastActiveDate: new Date().toDateString() 
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('learningState');
      if (stored) {
        const parsed = JSON.parse(stored);

        const today = new Date().toDateString();
        if (parsed.lastActiveDate !== today) {
          const newState = { hasStartedToday: false, isPaused: false, lastActiveDate: today };
          localStorage.setItem('learningState', JSON.stringify(newState));
          setLearningState(newState);
        } else {
          setLearningState(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading learning state:', error);
    }
  }, []);

  const updateLearningState = (state: Partial<LearningState>) => {
    const newState = {
      ...learningState,
      ...state,
      lastActiveDate: new Date().toDateString()
    };
    localStorage.setItem('learningState', JSON.stringify(newState));
    setLearningState(newState);
  };

  return { learningState, updateLearningState };
};
