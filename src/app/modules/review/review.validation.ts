import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    property: z.string(),
    reviewer: z.string(),
    rating: z.number(),
    review: z.string(),
  }),
});

export const reviewValidation = { createReviewValidationSchema };
