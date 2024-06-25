import { z } from 'zod';

const addOfferSchema = z.object({
  body: z.object({
    offeredPriceRange: z.number(),
    buyer: z.string(),
    offerStatus: z.enum(['accepted', 'rejected', 'pending']),
    property: z.string(),
  }),
});

export const offerValidation = { addOfferSchema };
