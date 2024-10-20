// Import the model
import ReviewModel from './review.model'; 

// Service function to create a new review.
const createReview = async (data: object) => {
  const newReview = await ReviewModel.create(data);
  return newReview;
};


// Service function to retrieve a single review by ID.
const getReviewById = async (id: string) => {
  return await ReviewModel.findById(id);
};

// Service function to retrieve multiple review based on query parameters.
const getAllReview = async (query: object) => {
  return await ReviewModel.find(query);
};

export const reviewServices = {
  createReview,
  getReviewById,
  getAllReview,
};