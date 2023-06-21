import mongoose, { Document, Schema } from "mongoose";

export interface MongoosePostModel extends Document {
  title: string;
  content: string;
  createdAt: string;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<MongoosePostModel>("Post", PostSchema);
