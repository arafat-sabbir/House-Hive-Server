import mongoose, { Schema } from 'mongoose';
import { TProperty } from './property.interface';

// Define an interface representing a Property document

// Define the Property schema
const PropertySchema: Schema<TProperty> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the Property model
const PropertyModel = mongoose.model<TProperty>('Property', PropertySchema);

// Export the Property model
export default PropertyModel;