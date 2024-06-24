import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';

const create = catchAsync(async (req, res) => {
  const result = await userService.create(req.body);
  sendResponse(res, {
    message: 'User Created Successfully',
    data: result,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await userService.getSingle(req.query.email as string);
  sendResponse(res, {
    message: 'User Retrieved Successfully',
    data: result,
  });
});

export const userController = { create,getSingle };
