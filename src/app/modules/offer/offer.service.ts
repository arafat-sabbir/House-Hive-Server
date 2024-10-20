// Import the model
import OfferModel from './offer.model'; 

// Service function to create a new offer.
const createOffer = async (data: object) => {
  const newOffer = await OfferModel.create(data);
  return newOffer;
};


// Service function to retrieve a single offer by ID.
const getOfferById = async (id: string) => {
  return await OfferModel.findById(id);
};

// Service function to retrieve multiple offer based on query parameters.
const getAllOffer = async (query: object) => {
  return await OfferModel.find(query);
};

export const offerServices = {
  createOffer,
  getOfferById,
  getAllOffer,
};