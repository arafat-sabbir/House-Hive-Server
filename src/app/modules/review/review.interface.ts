import { Types } from 'mongoose';

export type TReview = {
  reviewer: Types.ObjectId;
  property: Types.ObjectId;
  rating: number;
  review: string;
};
