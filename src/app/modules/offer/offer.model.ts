import mongoose, { Schema } from 'mongoose';
import { TOffer } from './offer.interface';

const offerSchema = new Schema<TOffer>(
  {
    offeredPrice: {
      type: String,
      required: true,
    },
    buyer: { type: Schema.Types.ObjectId, ref: 'User' },
    offerStatus: {
      type: String,
      enum: ['accepted', 'rejected', 'pending'],
      required: true,
    },
    property: {
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
