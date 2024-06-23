import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    photo: z.string(),
    role: z.string(),
    agentReq: z.string().optional(),
    whatsapp: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
  }),
});

export const userValidation = { createUserValidationSchema };
