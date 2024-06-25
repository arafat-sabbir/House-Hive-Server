import { TProperty } from './property.interface';
import PropertyModel from './property.model';

const add = async (property: TProperty) => {
  const result = await (
    await PropertyModel.create(property)
  ).populate({ path: 'agent', select: '-password' });
  return result;
};
export const propertyService = { add };
