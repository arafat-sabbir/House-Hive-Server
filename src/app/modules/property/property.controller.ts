import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { propertyService } from './property.service';

const add = catchAsync(async (req, res) => {
  const result = await propertyService.add(req.body);
  sendResponse(res, {
    message: 'Property Added Successfully',
    data: result,
  });
});

export const propertyController = { add };
