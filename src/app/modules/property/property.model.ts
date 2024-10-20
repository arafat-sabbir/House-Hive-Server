import mongoose, { Schema } from 'mongoose';
import { TProperty } from './property.interface';

// Define an interface representing a Property document

// Define the Property schema
const PropertySchema: Schema<TProperty> = new Schema(
  {
    title: String,
    verificationStatus: { type: String, default: 'pending' },
    minPrice: Number,
    maxPrice: Number,
    advertiseStatus: { type: String, default: 'no' },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, versionKey: false }
);

// Create the Property model
const PropertyModel = mongoose.model<TProperty>('Property', PropertySchema);

// Export the Property model
export default PropertyModel;
