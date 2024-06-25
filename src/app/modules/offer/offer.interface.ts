import { Types } from "mongoose";

export type TOffer = {
    offeredPriceRange: string;
    buyer:Types.ObjectId;
    offerStatus: 'accepted' | 'rejected' | 'pending';
    propertyId: Types.ObjectId;
  }