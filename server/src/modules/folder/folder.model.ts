import { model, Schema, Types } from "mongoose";

export interface IFolder {
  name: string;
  userId: Types.ObjectId
}

const schema = new Schema<IFolder>({
  name: { type: String, required: true, trim: true, unique: true, lowercase: true },
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}, { timestamps: true });

const Folder = model<IFolder>('Folder', schema);
export default Folder;