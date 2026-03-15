/**
 * Client-side progress tracker using localStorage.
 * Tracks completed lessons, completed stages, skipped stages, and current lesson.
 */
export class ProgressTracker {
  private storageKey = 'circuit-wise-progress';

  private getState(): ProgressState {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : this.defaultState();
    } catch {
      return this.defaultState();
    }
  }

  private defaultState(): ProgressState {
    return { completedLessons: [], completedStages: [], skippedStages: [], currentLesson: null };
  }

  private saveState(state: ProgressState): void {
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  markLessonComplete(lessonId: string): void {
    const state = this.getState();
    if (!state.completedLessons.includes(lessonId)) {
      state.completedLessons.push(lessonId);
      this.saveState(state);
    }
  }

  markStageComplete(stageNumber: number): void {
    const state = this.getState();
    if (!state.completedStages.includes(stageNumber)) {
      state.completedStages.push(stageNumber);
      this.saveState(state);
    }
  }

  markStageSkipped(stageNumber: number): void {
    const state = this.getState();
    if (!state.skippedStages.includes(stageNumber)) {
      state.skippedStages.push(stageNumber);
      if (!state.completedStages.includes(stageNumber)) {
        state.completedStages.push(stageNumber);
      }
      this.saveState(state);
    }
  }

  isLessonComplete(lessonId: string): boolean {
    return this.getState().completedLessons.includes(lessonId);
  }

  isStageComplete(stageNumber: number): boolean {
    return this.getState().completedStages.includes(stageNumber);
  }

  /** Count how many lessons matching a prefix are completed. */
  countCompletedLessonsForStage(stagePrefix: string): number {
    return this.getState().completedLessons.filter((id) => id.startsWith(stagePrefix)).length;
  }

  setCurrentLesson(lessonId: string): void {
    const state = this.getState();
    state.currentLesson = lessonId;
    this.saveState(state);
  }

  reset(): void {
    localStorage.removeItem(this.storageKey);
  }

  getProgress(): ProgressState {
    return this.getState();
  }
}

export interface ProgressState {
  completedLessons: string[];
  completedStages: number[];
  skippedStages: number[];
  currentLesson: string | null;
}
