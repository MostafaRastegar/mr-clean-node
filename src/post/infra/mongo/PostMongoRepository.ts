import PostRepositoryModel from "./PostMongoRepositoryModel";
import { IPostRepository } from "@/post/repositories/IPostRepository";
import Post from "@/post/models/Post";

function mapPostRepositoryToPost(postMongoose: any): Post {
  return {
    title: postMongoose.title,
    content: postMongoose.content,
    id: postMongoose._id.toString(),
  };
}
function PostRepository(): IPostRepository {
  return {
    async create(postData: Post): Promise<Post> {
      const blogPost = await PostRepositoryModel.create(postData);
      return mapPostRepositoryToPost(blogPost);
    },

    async getAll(): Promise<Post[] | []> {
      const posts = await PostRepositoryModel.find();
      return posts.map((post) => mapPostRepositoryToPost(post));
    },

    async getById(postId: string): Promise<Post | null> {
      const post = await PostRepositoryModel.findById(postId).exec();
      return post ? mapPostRepositoryToPost(post) : null;
    },

    async update(postId: string, postData: Post): Promise<Post | null> {
      const updatedPost = await PostRepositoryModel.findByIdAndUpdate(
        postId,
        postData,
        {
          new: true,
        }
      ).exec();
      return updatedPost ? mapPostRepositoryToPost(updatedPost) : null;
    },

    async delete(postId: string): Promise<boolean> {
      const result = await PostRepositoryModel.findByIdAndDelete(postId).exec();
      return !!result;
    },
  };
}

export default PostRepository;
