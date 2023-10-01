import Post from "@/post/models/Post";
import mongoose, { Schema, Document } from "mongoose";

export interface PostDocument extends Document, Omit<Post, "id"> {}

const PostSchema: Schema<PostDocument> = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: String, required: true },
});

export default mongoose.model<PostDocument>("Post", PostSchema);
