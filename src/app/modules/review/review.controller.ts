import { Request, Response } from 'express';
import { reviewServices } from './review.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single Review.
const createReview = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new review and get the result
  const result = await reviewServices.createReview(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New Review created Successfully',
    data: result,
  });
});



// Controller function to handle the retrieval of a single review by ID.
 const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the review by ID and get the result
  const result = await reviewServices.getReviewById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: 'Review Retrieved Successfully',
    data: result,
  });
});


// Controller function to handle the retrieval of multiple review.
 const getAllReview = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple review based on query parameters and get the result
  const result = await reviewServices.getAllReview(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Reviews Retrieved Successfully',
    data: result,
  });
});


export const reviewControllers = {
  createReview,
  getSingleReview,
  getAllReview,
}