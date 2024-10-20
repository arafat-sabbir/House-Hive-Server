import { Request, Response } from 'express';
import { offerServices } from './offer.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single Offer.
const createOffer = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new offer and get the result
  const result = await offerServices.createOffer(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New Offer created Successfully',
    data: result,
  });
});



// Controller function to handle the retrieval of a single offer by ID.
 const getSingleOffer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the offer by ID and get the result
  const result = await offerServices.getOfferById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: 'Offer Retrieved Successfully',
    data: result,
  });
});


// Controller function to handle the retrieval of multiple offer.
 const getAllOffer = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple offer based on query parameters and get the result
  const result = await offerServices.getAllOffer(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Offers Retrieved Successfully',
    data: result,
  });
});


export const offerControllers = {
  createOffer,
  getSingleOffer,
  getAllOffer,
}