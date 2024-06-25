import UserModel from '../user/user.model';
import { TReview } from './review.interface';
import ReviewModel from './review.model';

const create = async (payload: TReview) => {
    const user = await UserModel.findById({_id:payload.reviewer});
    if(!user){
        throw new Error('User not found');
    }
    // const product = await
  const review = (await ReviewModel.create(payload)).populate("reviewer property");
  return review;
};

export const reviewService = { create };
