import { TProperty } from "./property.interface";
import PropertyModel from "./property.model";

const add = async (property: TProperty) => {
    const result = await PropertyModel.create(property);
    return result;
};
export const propertyService = { add }