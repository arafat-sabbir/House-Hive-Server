import mongoose from 'mongoose';
import { TReview } from './review.interface';
const { Schema } = mongoose;

const reviewSchema = new Schema<TReview>(
  {
    reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    property: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    rating: { type: Number, min: 1, max: 5 },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model<TReview>('Review', reviewSchema);
export default ReviewModel;
