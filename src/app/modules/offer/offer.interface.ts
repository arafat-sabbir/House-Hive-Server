import { Types } from "mongoose";

export type TOffer = {
    offeredPrice: number;
    buyer:Types.ObjectId;
    offerStatus: 'accepted' | 'rejected' | 'pending';
    property: Types.ObjectId;
  }