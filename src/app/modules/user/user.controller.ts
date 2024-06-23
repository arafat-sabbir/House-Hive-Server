import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await userService.create(req.body);
  sendResponse(res, {
    message: 'User Created Successfully',
    data: result,
  });
});

export const userController = { createUser };
