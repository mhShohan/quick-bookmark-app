import { model, Schema, Types } from "mongoose";

export interface IBookmark {
  title: string;
  link: string;
  folderId: Types.ObjectId;
  userId: Types.ObjectId;
  type: 'video' | 'blog' | 'book' | 'documentation';
  tags?: string[];
}

const schema = new Schema<IBookmark>({
  title: { type: String, required: true, trim: true },
  link: { type: String, required: true, trim: true },
  folderId: { type: Schema.Types.ObjectId, ref: 'Folder', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['video', 'blog', 'book', 'documentation'], required: true },
  tags: [{ type: String }],
}, { timestamps: true });

const Bookmark = model<IBookmark>('Bookmark', schema);
export default Bookmark;
