import mongoose, { Schema } from 'mongoose';
import { TWishlist } from './wishlist.interface';

// Define an interface representing a Wishlist document

// Define the Wishlist schema
const WishlistSchema: Schema<TWishlist> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the Wishlist model
const WishlistModel = mongoose.model<TWishlist>('Wishlist', WishlistSchema);

// Export the Wishlist model
export default WishlistModel;