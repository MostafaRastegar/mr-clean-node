import PostRepositoryModel from "./PostRepositoryModel";
import { IPostRepository } from "../../app/post/models/IPostRepository";
import Post from "../../app/post/models/Post";

class PostRepository implements IPostRepository {
  private mapPostRepositoryToPost(userMongoose: any): Post {
    return {
      id: userMongoose._id.toString(),
      title: userMongoose.title,
      content: userMongoose.content,
      createdAt: userMongoose.createdAt,
    };
  }
  async create(postData: Post): Promise<Post> {
    const blogPost = await PostRepositoryModel.create(postData);
    return this.mapPostRepositoryToPost(blogPost);
  }

  async getAll(): Promise<Post[] | []> {
    return await PostRepositoryModel.find();
  }

  async getById(postId: string): Promise<Post | null> {
    const post = await PostRepositoryModel.findById(postId).exec();
    return post ? this.mapPostRepositoryToPost(post) : null;
  }

  async update(postId: string, postData: Post): Promise<Post | null> {
    const updatedPost = await PostRepositoryModel.findByIdAndUpdate(
      postId,
      postData,
      {
        new: true,
      }
    ).exec();
    return updatedPost ? this.mapPostRepositoryToPost(updatedPost) : null;
  }

  async delete(postId: string): Promise<boolean> {
    const result = await PostRepositoryModel.findByIdAndDelete(postId).exec();
    return !!result;
  }
}

export default PostRepository;
