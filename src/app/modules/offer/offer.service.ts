import { TOffer } from './offer.interface';
import OfferModel from './offer.model';

const add = async (payload: TOffer) => {
  const result = await OfferModel.create(payload);
  return result;
};

export const offerService = { add };
