import { TUser } from './user.interface';
import UserModel from './user.model';

const create = async (payload: TUser) => {
  const user = await UserModel.create(payload);
  return user;
};

export const userService = { create };
