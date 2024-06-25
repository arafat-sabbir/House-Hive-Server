import { Types } from "mongoose";

export type TProperty = {
    propertyImage: string;
    propertyTitle: string;
    propertyLocation: string;
    minPrice: number;
    maxPrice: number;
    propertyVerificationStatus: 'verified' | 'unverified';
    agent:Types.ObjectId;
    interiorFacilities: string[];
    outdoorFacilities: string[];
    otherFacilities: string[];
    bedRooms: number;
    bathRooms: number;
    rooms: number;
    builtYear: number;
    associationFee: number;
    yearlyTax: number;
    upozila: string;
    district: string;
    division: string;
    listedFor: 'For Sale' | 'For Rent';
    category: string;
    longitude: string;
    latitude: string;
    advertiseStatus: 'advertised' | 'not advertised';
    propertySize: number;
    addedDate: string;
    description: string;
  }
  