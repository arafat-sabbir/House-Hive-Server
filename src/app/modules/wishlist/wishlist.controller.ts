import { Request, Response } from 'express';
import { wishlistServices } from './wishlist.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single Wishlist.
const createWishlist = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new wishlist and get the result
  const result = await wishlistServices.createWishlist(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New Wishlist created Successfully',
    data: result,
  });
});



// Controller function to handle the retrieval of a single wishlist by ID.
 const getSingleWishlist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the wishlist by ID and get the result
  const result = await wishlistServices.getWishlistById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: 'Wishlist Retrieved Successfully',
    data: result,
  });
});


// Controller function to handle the retrieval of multiple wishlist.
 const getAllWishlist = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple wishlist based on query parameters and get the result
  const result = await wishlistServices.getAllWishlist(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Wishlists Retrieved Successfully',
    data: result,
  });
});


export const wishlistControllers = {
  createWishlist,
  getSingleWishlist,
  getAllWishlist,
}