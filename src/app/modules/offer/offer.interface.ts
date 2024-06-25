import { Types } from "mongoose";

export type TOffer = {
    propertyTitle: string;
    propertyLocation: string;
    propertyImage: string;
    minPrice: number;
    maxPrice: number;
    offeredPriceRange: string;
    offeredDate: Date;
    buyer:Types.ObjectId;
    offerStatus: 'accepted' | 'rejected' | 'pending';
    propertyId: Types.ObjectId;
  }