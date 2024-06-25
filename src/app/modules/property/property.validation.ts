import { z } from 'zod';

const addPropertySchema = z.object({
    body:z.object({
        propertyImage: z.string(),
        propertyTitle: z.string(),
        propertyLocation: z.string(),
        minPrice: z.number(),
        maxPrice: z.number(),
        propertyVerificationStatus: z.enum(['verified', 'unverified']),
        agent: z.string().optional(), // Assuming agent is a reference to a User object ID
        interiorFacilities: z.array(z.string()),
        outdoorFacilities: z.array(z.string()),
        otherFacilities: z.array(z.string()),
        bedRooms: z.number(),
        bathRooms: z.number(),
        rooms: z.number(),
        builtYear: z.number(),
        associationFee: z.number(),
        yearlyTax: z.number(),
        upozila: z.string(),
        district: z.string(),
        division: z.string(),
        listedFor: z.enum(['For Sale', 'For Rent']),
        category: z.string(),
        longitude: z.string(),
        latitude: z.string(),
        propertySize: z.number(),
        description: z.string(),
      })
})

export const propertyValidation = { addPropertySchema };
