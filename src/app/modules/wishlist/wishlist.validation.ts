import { z } from "zod";

// Validation Schema For createWishlist
const createWishlistSchema = z.object({
  body:z.object({

  })
})

export const wishlistValidation = {
  createWishlistSchema
}