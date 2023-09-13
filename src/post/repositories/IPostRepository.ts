import Post from "@/post/models/Post";

export interface IPostRepository {
  create(postData: Post): Promise<Post>;
  getAll(): Promise<Post[] | []>;
  getById(postId: string): Promise<Post | null>;
  update(id: string, post: Post): Promise<Post | null>;
  delete(postId: string): Promise<boolean>;
}
