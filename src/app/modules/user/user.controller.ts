import catchAsync from 'src/app/utils/catchAsync';
import sendResponse from 'src/app/utils/sendResponse';
import { userService } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await userService.create(userData);
  sendResponse(res, {
    message: 'User Created Successfully',
    data: result,
  });
});

export const userController = { createUser };
