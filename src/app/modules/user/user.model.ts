import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    photo: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['admin', 'user', 'agent'] },
    agentReq: { type: Schema.Types.ObjectId, ref: 'agentReq' },
    whatsapp: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel = model<TUser>('User', userSchema);
export default UserModel;
