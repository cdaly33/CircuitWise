/**
 * TypeScript interfaces for Circuit-Wise quiz questions.
 * Derived from docs/add-quizes/quiz-schema.json
 */

export type QuestionType = 'multiple-choice' | 'numeric';
export type Difficulty = 'beginner' | 'easy' | 'medium' | 'hard';

export interface DiagramInfo {
  kind: 'image' | 'svg';
  src: string;
  alt: string;
  caption?: string | null;
}

export interface Choice {
  id: string;
  text: string;
}

export interface NumericInputConfig {
  unit?: string | null;
  decimalPlaces?: number | null;
  min?: number | null;
  max?: number | null;
  placeholder?: string | null;
  acceptFractions?: boolean | null;
}

export interface MultipleChoiceAnswer {
  choiceId: string;
}

export interface NumericAnswer {
  value: number;
  tolerance?: number;
}

export type Answer = MultipleChoiceAnswer | NumericAnswer;

export interface SolutionStep {
  title: string;
  body?: string | null;
  formula?: string | null;
  substitution?: string | null;
  result?: string | null;
  note?: string | null;
}

export interface Solution {
  finalAnswer: string;
  summary?: string | null;
  steps: SolutionStep[];
  whyItWorks?: string | null;
  check?: string | null;
}

export interface QuizQuestion {
  id: string;
  stageId?: string | null;
  lessonId?: string | null;
  topic?: string | null;
  difficulty?: Difficulty;
  type: QuestionType;
  prompt: string;
  questionLabel?: string | null;
  diagram?: DiagramInfo | null;
  choices?: Choice[];
  inputs?: NumericInputConfig | null;
  answer: Answer;
  hint?: string | null;
  solution: Solution;
  commonMistakes?: string[];
  tags?: string[];
}

// Type guards
export function isMultipleChoiceAnswer(
  answer: Answer,
): answer is MultipleChoiceAnswer {
  return 'choiceId' in answer;
}

export function isNumericAnswer(answer: Answer): answer is NumericAnswer {
  return 'value' in answer;
}
