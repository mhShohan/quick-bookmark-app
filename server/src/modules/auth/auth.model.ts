import { model, Schema } from "mongoose";
import { UserRoles } from "../../constant";
import { IUser } from "./auth.interface";

const schema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    enum: UserRoles,
    default: 'USER',
  },
}, { timestamps: true });

const User = model<IUser>('User', schema);

export default User;
