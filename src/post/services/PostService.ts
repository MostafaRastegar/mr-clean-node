import Post, { PostWithAuthor } from "@/post/models/Post";
import { IPostRepository } from "@/post/repositories/IPostRepository";
import { IPostService } from "@/post/services/IPostService";

function PostService(PostRepository: IPostRepository): IPostService {
  return {
    async createPost(postData: Post): Promise<Post> {
      return await PostRepository.create(postData);
    },

    async getAllPosts(): Promise<Post[]> {
      return await PostRepository.getAll();
    },

    async getPostById(id: string): Promise<PostWithAuthor | null> {
      return await PostRepository.getById(id);
    },

    async updatePost(id: string, postData: Post): Promise<Post | null> {
      return await PostRepository.update(id, postData);
    },

    async deletePost(id: string): Promise<boolean> {
      return await PostRepository.delete(id);
    },
  };
}

export default PostService;
