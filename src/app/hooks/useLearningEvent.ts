type LearningEventType = 'start' | 'pause' | 'reset';

class LearningEventEmitter {
  private static instance: LearningEventEmitter;
  private listeners: ((type: LearningEventType) => void)[] = [];

  static getInstance() {
    if (!this.instance) {
      this.instance = new LearningEventEmitter();
    }
    return this.instance;
  }

  emit(type: LearningEventType) {
    this.listeners.forEach(listener => listener(type));
  }

  subscribe(callback: (type: LearningEventType) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }
}

export const useLearningEvent = () => {
  const emitter = LearningEventEmitter.getInstance();
  return {
    emitLearningEvent: (type: LearningEventType) => emitter.emit(type),
    subscribe: (callback: (type: LearningEventType) => void) => emitter.subscribe(callback)
  };
};
