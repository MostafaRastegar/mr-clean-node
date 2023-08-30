import Post from "@root/post/models/Post";
import mongoose, { Schema, Document } from "mongoose";

export interface PostDocument extends Document, Post {
  title: string;
  content: string;
}

const PostSchema: Schema<PostDocument> = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export default mongoose.model<PostDocument>("Post", PostSchema);
