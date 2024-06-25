import { z } from 'zod';

const addOfferSchema = z.object({
  body: z.object({
    offeredPrice: z.number(),
    buyer: z.string(),
    offerStatus: z.enum(['accepted', 'rejected', 'pending']).default("pending").optional(),
    property: z.string(),
  }),
});

export const offerValidation = { addOfferSchema };
