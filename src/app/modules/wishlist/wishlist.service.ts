// Import the model
import WishlistModel from './wishlist.model'; 

// Service function to create a new wishlist.
const createWishlist = async (data: object) => {
  const newWishlist = await WishlistModel.create(data);
  return newWishlist;
};


// Service function to retrieve a single wishlist by ID.
const getWishlistById = async (id: string) => {
  return await WishlistModel.findById(id);
};

// Service function to retrieve multiple wishlist based on query parameters.
const getAllWishlist = async (query: object) => {
  return await WishlistModel.find(query);
};

export const wishlistServices = {
  createWishlist,
  getWishlistById,
  getAllWishlist,
};