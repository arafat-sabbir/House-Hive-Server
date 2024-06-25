import mongoose, { Schema } from 'mongoose';
import { TOffer } from './offer.interface';

const offerSchema = new Schema<TOffer>(
  {
    propertyTitle: {
      type: String,
      required: true,
    },
    propertyLocation: {
      type: String,
      required: true,
    },
    propertyImage: {
      type: String,
      required: true,
    },
    minPrice: {
      type: Number,
      required: true,
    },
    maxPrice: {
      type: Number,
      required: true,
    },
    offeredPriceRange: {
      type: String,
      required: true,
    },
    buyer: { type: Schema.Types.ObjectId, ref: 'User' },
    offerStatus: {
      type: String,
      enum: ['accepted', 'rejected', 'pending'],
      required: true,
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OfferModel = mongoose.model<TOffer>('Offer', offerSchema);

export default OfferModel;
