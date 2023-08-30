import Post from "../models/Post";
import { IPostRepository } from "../repositories/IPostRepository";
import {IPostService} from "@root/post/services/IPostService";

class PostService implements IPostService {
  postRepository: IPostRepository;
  constructor(postRepository: IPostRepository) {
    this.postRepository = postRepository;
  }

  async createPost(postData: Post): Promise<Post> {
    return await this.postRepository.create(postData);
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postRepository.getAll();
  }

  async getPostById(id: string): Promise<Post | null> {
    return await this.postRepository.getById(id);
  }

  async updatePost(id: string, postData: Post): Promise<Post | null> {
    return await this.postRepository.update(id, postData);
  }

  async deletePost(id: string): Promise<boolean> {
    return await this.postRepository.delete(id);
  }
}

export default PostService;
