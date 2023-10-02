import Post from "@/post/models/Post";
import { GET_POST_ID } from "../infra/mongo/PostMongoRepository";

export interface IPostRepository {
  create(postData: Post): Promise<Post>;
  getAll(): Promise<Post[] | []>;
  getById(postId: string): Promise<GET_POST_ID | null>;
  update(id: string, post: Post): Promise<Post | null>;
  delete(postId: string): Promise<boolean>;
}
