import { z } from "zod";

// Validation Schema For createProperty
const createPropertySchema = z.object({
  body:z.object({

  })
})

export const propertyValidation = {
  createPropertySchema
}