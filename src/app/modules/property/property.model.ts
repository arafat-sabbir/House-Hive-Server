import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const propertySchema = new Schema(
  {
    propertyImage: {
      type: String,
      required: true,
    },
    propertyTitle: {
      type: String,
      required: true,
    },
    propertyLocation: {
      type: String,
      required: true,
    },
    minPrice: {
      type: Number,
      required: true,
    },
    maxPrice: {
      type: Number,
      required: true,
    },
    propertyVerificationStatus: {
      type: String,
      enum: ['verified', 'unverified'],
      required: true,
    },
    agent: { type: Schema.Types.ObjectId, ref: 'User' },
    interiorFacilities: {
      type: [String],
      required: true,
    },
    outdoorFacilities: {
      type: [String],
      required: true,
    },
    otherFacilities: {
      type: [String],
      required: true,
    },
    bedRooms: {
      type: Number,
      required: true,
    },
    bathRooms: {
      type: Number,
      required: true,
    },
    rooms: {
      type: Number,
      required: true,
    },
    builtYear: {
      type: Number,
      required: true,
    },
    associationFee: {
      type: Number,
      required: true,
    },
    yearlyTax: {
      type: Number,
      required: true,
    },
    upozila: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
    listedFor: {
      type: String,
      enum: ['For Sale', 'For Rent'],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    advertiseStatus: {
      type: String,
      enum: ['advertise', 'not advertise'],
      required: true,
    },
    propertySize: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PropertyModel = mongoose.model('Property', propertySchema);

export default PropertyModel;
