import { Types } from "mongoose";

export type TOffer = {
    offeredPrice: string;
    buyer:Types.ObjectId;
    offerStatus: 'accepted' | 'rejected' | 'pending';
    property: Types.ObjectId;
  }