import User from "@root/core/user/models/User";
import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
}

const UserSchema: Schema<UserDocument> = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

export default mongoose.model<User>("User", UserSchema);
