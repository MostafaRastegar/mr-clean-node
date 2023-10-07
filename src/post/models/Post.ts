import User, { UserWithId } from "@/user/models/User";
import { ObjectId } from "mongoose";

interface Post {
  title: string;
  content: string;
  id: string;
  _author: ObjectId;

  created_at?: Date;
  updated_at?: Date;
}

export interface PostWithAuthor extends Omit<Post, "_author"> {
  _author: Omit<UserWithId, "password">;
}

export default Post;
