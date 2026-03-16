/**
 * Client-side answer evaluation for Circuit-Wise quizzes.
 * Supports multiple-choice (choice-id match) and numeric (absolute tolerance).
 */

import type { QuizQuestion } from './types';
import { isMultipleChoiceAnswer, isNumericAnswer } from './types';

export interface GradeResult {
  isCorrect: boolean;
  message: string;
  correctAnswer: string;
}

/**
 * Grade a user's answer for a given question.
 *
 * @param question - The quiz question definition
 * @param userAnswer - The raw user input (choice id string or numeric string)
 * @returns GradeResult with correctness, friendly message, and the correct answer
 */
export function gradeAnswer(
  question: QuizQuestion,
  userAnswer: string,
): GradeResult {
  const trimmed = userAnswer.trim();

  if (question.type === 'multiple-choice') {
    return gradeMultipleChoice(question, trimmed);
  }

  return gradeNumeric(question, trimmed);
}

function gradeMultipleChoice(
  question: QuizQuestion,
  selectedId: string,
): GradeResult {
  const answer = question.answer;

  if (!isMultipleChoiceAnswer(answer)) {
    return {
      isCorrect: false,
      message: 'This question has a configuration error.',
      correctAnswer: '',
    };
  }

  if (!selectedId) {
    return {
      isCorrect: false,
      message: 'Please select an answer before checking.',
      correctAnswer: '',
    };
  }

  const isCorrect = selectedId === answer.choiceId;
  const correctChoice = question.choices?.find((c) => c.id === answer.choiceId);
  const correctText = correctChoice?.text ?? answer.choiceId;

  return {
    isCorrect,
    message: isCorrect
      ? 'Correct — now let\u2019s confirm the steps.'
      : 'Not quite — let\u2019s solve it step by step.',
    correctAnswer: correctText,
  };
}

function gradeNumeric(
  question: QuizQuestion,
  rawInput: string,
): GradeResult {
  const answer = question.answer;

  if (!isNumericAnswer(answer)) {
    return {
      isCorrect: false,
      message: 'This question has a configuration error.',
      correctAnswer: '',
    };
  }

  if (rawInput === '') {
    return {
      isCorrect: false,
      message: 'Enter a number before checking your answer.',
      correctAnswer: '',
    };
  }

  const parsed = Number(rawInput);

  if (Number.isNaN(parsed)) {
    return {
      isCorrect: false,
      message: 'That doesn\u2019t look like a number. Please enter a numeric value.',
      correctAnswer: '',
    };
  }

  const tolerance = answer.tolerance ?? 0;
  const isCorrect = Math.abs(parsed - answer.value) <= tolerance;

  return {
    isCorrect,
    message: isCorrect
      ? 'Correct — now let\u2019s confirm the steps.'
      : 'Not quite — let\u2019s solve it step by step.',
    correctAnswer: question.solution.finalAnswer,
  };
}
