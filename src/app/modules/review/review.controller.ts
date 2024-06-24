import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { reviewService } from './review.service';

const create = catchAsync(async (req, res) => {
  const result = await reviewService.create(req.body);
  sendResponse(res, {
    message: 'Review Added Successfully',
    data: result,
  });
});
export const reviewController = { create };