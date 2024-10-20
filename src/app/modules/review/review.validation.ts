import { z } from "zod";

// Validation Schema For createReview
const createReviewSchema = z.object({
  body:z.object({

  })
})

export const reviewValidation = {
  createReviewSchema
}