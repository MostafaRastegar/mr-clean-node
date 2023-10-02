import User from "@/user/models/User";
import { ObjectId } from "mongoose";

interface Post {
  title: string;
  content: string;
  id: string;
  _author: ObjectId;
}

export interface PostWith_author extends Post {
  _author: Omit<User, "password">;
}

export default Post;
