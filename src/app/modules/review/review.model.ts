import mongoose, { Schema } from 'mongoose';
import { TReview } from './review.interface';

// Define an interface representing a Review document

// Define the Review schema
const ReviewSchema: Schema<TReview> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the Review model
const ReviewModel = mongoose.model<TReview>('Review', ReviewSchema);

// Export the Review model
export default ReviewModel;