import { Request, Response } from 'express';
import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single User.
const createUser = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new user and get the result
  const result = await userServices.createUser(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New User created Successfully',
    data: result,
  });
});



// Controller function to handle the retrieval of a single user by ID.
 const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the user by ID and get the result
  const result = await userServices.getUserById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: 'User Retrieved Successfully',
    data: result,
  });
});


// Controller function to handle the retrieval of multiple user.
 const getAllUser = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple user based on query parameters and get the result
  const result = await userServices.getAllUser(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Users Retrieved Successfully',
    data: result,
  });
});


export const userControllers = {
  createUser,
  getSingleUser,
  getAllUser,
}