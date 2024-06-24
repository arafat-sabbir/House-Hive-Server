import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    property: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    review: { type: String, required: true },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model('Review', reviewSchema);
export default ReviewModel;
