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
const getAll = catchAsync(async (req, res) => {
  const user = await userService.getAll();
  sendResponse(res, {
    message: 'User Retrieved Successfully',
    data: user,
  });
});

const getAccessToken = catchAsync(async (req, res) => {
  const accessToken = await userService.getAccessToken(req.body._id);
  sendResponse(res, {
    message: 'User Retrieved Successfully',
    data: accessToken,
  });
});
export const userController = { create, getSingle, getAll, getAccessToken };
