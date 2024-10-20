import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.interface';

// Define an interface representing a User document

// Define the User schema
const UserSchema: Schema<TUser> = new Schema({
  // Define schema fields here
  // Example fields (replace with actual schema)
  // fieldName: {
  //   type: Schema.Types.FieldType,
  //   required: true,
  //   trim: true,
  // },
},{timestamps:true,versionKey:false});

// Create the User model
const UserModel = mongoose.model<TUser>('User', UserSchema);

// Export the User model
export default UserModel;