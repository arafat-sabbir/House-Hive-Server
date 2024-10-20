import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.interface';

// Define an interface representing a User document

// Define the User schema
const UserSchema: Schema<TUser> = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin', 'agent'] },
    agentReq: { type: Boolean, default: false },
    whatsapp: String,
    linkedin: String,
    twitter: String,
    facebook: String,
  },
  { timestamps: true, versionKey: false }
);

// Create the User model
const UserModel = mongoose.model<TUser>('User', UserSchema);

// Export the User model
export default UserModel;

