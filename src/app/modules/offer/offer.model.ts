import mongoose, { Schema } from 'mongoose';
import { TOffer } from './offer.interface';

// Define an interface representing a Offer document

// Define the Offer schema
const OfferSchema: Schema<TOffer> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the Offer model
const OfferModel = mongoose.model<TOffer>('Offer', OfferSchema);

// Export the Offer model
export default OfferModel;