import { model, Schema } from "mongoose";

export interface IAvatar {
  url: string;
}

const avatarSchema = new Schema<IAvatar>({
  url: { type: String, required: true, trim: true },
}, { timestamps: true });

export const Avatar = model<IAvatar>('Avatar', avatarSchema);