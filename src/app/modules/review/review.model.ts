import mongoose, { Schema } from 'mongoose';
import { TReview } from './review.interface';

// Define an interface representing a Review document

// Define the Review schema
const ReviewSchema: Schema<TReview> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    review: String,
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  },
  { timestamps: true, versionKey: false }
);

// Create the Review model
const ReviewModel = mongoose.model<TReview>('Review', ReviewSchema);

// Export the Review model
export default ReviewModel;

