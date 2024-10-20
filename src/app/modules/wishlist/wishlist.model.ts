import mongoose, { Schema } from 'mongoose';
import { TWishlist } from './wishlist.interface';

// Define an interface representing a Wishlist document

// Define the Wishlist schema
const WishlistSchema: Schema<TWishlist> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  },
  { timestamps: true, versionKey: false }
);

// Create the Wishlist model
const WishlistModel = mongoose.model<TWishlist>('Wishlist', WishlistSchema);

// Export the Wishlist model
export default WishlistModel;
