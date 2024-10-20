import { z } from "zod";

// Validation Schema For createUser
const createUserSchema = z.object({
  body:z.object({

  })
})

export const userValidation = {
  createUserSchema
}