import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    stage: z.number(),
    stageSlug: z.string(),
    lessonNumber: z.number(),
    description: z.string(),
    prerequisites: z.array(z.string()).optional(),
    nextLesson: z.string().optional(),
    keyTerms: z.array(z.string()),
    symbols: z.array(z.string()).optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    estimatedMinutes: z.number(),
    draft: z.boolean().optional().default(false),
  }),
});

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/glossary' }),
  schema: z.object({
    term: z.string(),
    category: z.string(),
    relatedTerms: z.array(z.string()).optional(),
    relatedLessons: z.array(z.string()).optional(),
    symbol: z.string().optional(),
  }),
});

const symbols = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/symbols' }),
  schema: z.object({
    name: z.string(),
    category: z.string(),
    svgFile: z.string(),
    altText: z.string(),
    relatedTerms: z.array(z.string()).optional(),
    relatedLessons: z.array(z.string()).optional(),
  }),
});

const stages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/stages' }),
  schema: z.object({
    title: z.string(),
    stageNumber: z.number(),
    description: z.string(),
    color: z.string().optional(),
  }),
});

const skipQuizzes = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: 'src/content/skip-quizzes' }),
  schema: z.object({
    stageSlug: z.string(),
    questions: z.array(
      z.object({
        question: z.string(),
        options: z.array(z.string()),
        correctIndex: z.number(),
        explanation: z.string(),
      })
    ),
    passingScore: z.number(),
  }),
});

export const collections = {
  lessons,
  glossary,
  symbols,
  stages,
  'skip-quizzes': skipQuizzes,
};
