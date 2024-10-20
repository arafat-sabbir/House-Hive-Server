// Import the model
import UserModel from './user.model'; 

// Service function to create a new user.
const createUser = async (data: object) => {
  const newUser = await UserModel.create(data);
  return newUser;
};


// Service function to retrieve a single user by ID.
const getUserById = async (id: string) => {
  return await UserModel.findById(id);
};

// Service function to retrieve multiple user based on query parameters.
const getAllUser = async (query: object) => {
  return await UserModel.find(query);
};

export const userServices = {
  createUser,
  getUserById,
  getAllUser,
};