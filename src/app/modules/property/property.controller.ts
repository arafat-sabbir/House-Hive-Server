import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { propertyService } from './property.service';

const add = catchAsync(async (req, res) => {
  const payload = req.body;
  payload.agent = req.user.id;
  const result = await propertyService.add(payload);
  sendResponse(res, {
    message: 'Property Added Successfully',
    data: result,
  });
});

export const propertyController = { add };
