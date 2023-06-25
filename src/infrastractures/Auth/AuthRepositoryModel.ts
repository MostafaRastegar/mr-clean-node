import User from "@root/core/auth/models/User";
import mongoose, { Schema } from "mongoose";

const AuthSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<User>("User", AuthSchema);
