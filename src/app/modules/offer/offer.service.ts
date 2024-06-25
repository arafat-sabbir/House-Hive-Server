import PropertyModel from '../property/property.model';
import { TOffer } from './offer.interface';

const add = async (payload: TOffer) => {
  const result = await PropertyModel.create(payload);
  return result;
};

export const offerService = { add };
