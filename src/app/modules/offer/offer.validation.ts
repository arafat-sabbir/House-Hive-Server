import { z } from "zod";

// Validation Schema For createOffer
const createOfferSchema = z.object({
  body:z.object({

  })
})

export const offerValidation = {
  createOfferSchema
}