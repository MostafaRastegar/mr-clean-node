import User from "@/user/models/User";
import mongoose, { Schema, Document } from "mongoose";

interface UserDocument extends Document, Omit<User, "_id"> {}

const UserSchema: Schema<UserDocument> = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<UserDocument>("User", UserSchema);
