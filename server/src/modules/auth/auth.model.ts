import { model, Schema } from "mongoose";
import { UserRoles, UserStatus } from "../../constant";
import { IUser } from "./auth.interface";

const schema = new Schema<IUser>({
  name: { type: String, required: true, trim: true, },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  role: { type: String, enum: UserRoles, default: 'USER' },
  status: { type: String, enum: UserStatus, default: 'ACTIVE' },
  title: { type: String, trim: true },
  description: { type: String, trim: true },
  avatar: { type: String, trim: true },
  address: { type: String, trim: true },
  phone: { type: String, trim: true },
  city: { type: String, trim: true },
  country: { type: String, trim: true },
  facebook: { type: String, trim: true },
  twitter: { type: String, trim: true },
  linkedin: { type: String, trim: true },
  instagram: { type: String, trim: true },
}, { timestamps: true });

const User = model<IUser>('User', schema);

export default User;
