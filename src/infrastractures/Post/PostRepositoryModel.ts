import Post from "@root/core/post/models/Post";
import mongoose, { Schema } from "mongoose";

export interface MongoosePostModel extends Post {
  title: string;
  content: string;
  createdAt: Date;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<MongoosePostModel>("Post", PostSchema);
