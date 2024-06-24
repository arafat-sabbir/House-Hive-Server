import { hashInfo } from '../../../app/utils/hashInfo';
import { TUser } from './user.interface';
import UserModel from './user.model';

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
    throw new Error('User not found');
  }
  const { password, ...result } = user.toJSON();
  return result;
};

export const userService = { create, getSingle };
