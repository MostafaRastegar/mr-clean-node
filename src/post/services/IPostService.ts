import Post from "../models/Post";

export interface IPostService {
  createPost(postData: Post): Promise<Post>;
  getAllPosts(): Promise<Post[] | []>;
  getPostById(postId: string): Promise<Post | null>;
  updatePost(id: string, post: Post): Promise<Post | null>;
  deletePost(postId: string): Promise<boolean>;
}
