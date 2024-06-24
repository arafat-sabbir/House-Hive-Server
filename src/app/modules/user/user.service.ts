import jwt from 'jsonwebtoken';
import AppError from '../../../app/errors/AppError';
import { hashInfo } from '../../../app/utils/hashInfo';
import { TUser } from './user.interface';
import UserModel from './user.model';
import config from '../../../app/config';

const create = async (payload: TUser) => {
  const existingUser = await UserModel.findOne({ email: payload.email });
  if (existingUser) {
    throw new Error('User already exists');
  }
  payload.password = hashInfo(payload.password);
  const user = await UserModel.create(payload);
  return user;
};

const getSingle = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError(404, 'No User Found');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...result } = user.toJSON();
  return result;
};

const getAll = async () => {
  const user = await UserModel.find();
  if (!user) {
    throw new AppError(404, 'No User Found');
  }
  return user;
};

const getAccessToken = async (_id: string) => {
  const user = await UserModel.findById({ _id });
  if (!user) {
    throw new AppError(404, 'No User Found');
  }
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    config.jwt_access_secret as string,
    {
      expiresIn: '1d',
    }
  );

  return accessToken;
};

export const userService = { create, getSingle, getAll, getAccessToken };
