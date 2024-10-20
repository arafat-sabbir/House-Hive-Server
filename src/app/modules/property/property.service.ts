// Import the model
import PropertyModel from './property.model'; 

// Service function to create a new property.
const createProperty = async (data: object) => {
  const newProperty = await PropertyModel.create(data);
  return newProperty;
};


// Service function to retrieve a single property by ID.
const getPropertyById = async (id: string) => {
  return await PropertyModel.findById(id);
};

// Service function to retrieve multiple property based on query parameters.
const getAllProperty = async (query: object) => {
  return await PropertyModel.find(query);
};

export const propertyServices = {
  createProperty,
  getPropertyById,
  getAllProperty,
};