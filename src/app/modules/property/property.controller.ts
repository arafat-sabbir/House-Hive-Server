import { Request, Response } from 'express';
import { propertyServices } from './property.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single Property.
const createProperty = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new property and get the result
  const result = await propertyServices.createProperty(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New Property created Successfully',
    data: result,
  });
});



// Controller function to handle the retrieval of a single property by ID.
 const getSingleProperty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the property by ID and get the result
  const result = await propertyServices.getPropertyById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: 'Property Retrieved Successfully',
    data: result,
  });
});


// Controller function to handle the retrieval of multiple property.
 const getAllProperty = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple property based on query parameters and get the result
  const result = await propertyServices.getAllProperty(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Propertys Retrieved Successfully',
    data: result,
  });
});


export const propertyControllers = {
  createProperty,
  getSingleProperty,
  getAllProperty,
}