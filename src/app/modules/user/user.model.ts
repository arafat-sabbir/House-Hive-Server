import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  agentReq: { type: Schema.Types.ObjectId, ref: 'agentReq' },
  whatsapp: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  facebook: { type: String },
});

const User = model<TUser>('User', userSchema);
module.exports = User;
