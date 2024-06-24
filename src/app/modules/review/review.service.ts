import { TReview } from './review.interface';
import ReviewModel from './review.model';

const create = async (payload: TReview) => {
  const review = await ReviewModel.create(payload);
  return review;
};

export const reviewService = { create };
