import Post from "@/post/models/Post";
import mongoose, { Schema, Document } from "mongoose";

export interface PostDocument extends Document, Omit<Post, "id"> {}

export const PostSchema: Schema<PostDocument> = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  _author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model<PostDocument>("Post", PostSchema);
