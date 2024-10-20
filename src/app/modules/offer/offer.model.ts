import mongoose, { Schema } from 'mongoose';
import { TOffer } from './offer.interface';

// Define an interface representing a Offer document

// Define the Offer schema
const OfferSchema: Schema<TOffer> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    offerStatus: { type: String, default: 'pending' },
    transactionId: String,
    payment: Number,
  },
  { timestamps: true, versionKey: false }
);

// Create the Offer model
const OfferModel = mongoose.model<TOffer>('Offer', OfferSchema);

// Export the Offer model
export default OfferModel;
