import PostRepositoryModel from "./PostMongoRepositoryModel";
import { IPostRepository } from "@/post/repositories/IPostRepository";
import Post, { PostWithAuthor } from "@/post/models/Post";

function mapPostRepositoryToPost(postMongoose: any): Post {
  return {
    title: postMongoose.title,
    content: postMongoose.content,
    id: postMongoose._id.toString(),
    _author: postMongoose._author,
    created_at: postMongoose?.created_at,
    updated_at: postMongoose?.updated_at,
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

    async getById(postId: string): Promise<PostWithAuthor | null> {
      const post = await PostRepositoryModel.findById(postId)
        .populate({ path: "_author", select: "-password" })
        .exec();
      return post
        ? ({
            title: post.title,
            content: post.content,
            id: post._id.toString(),
            _author: post._author,
          } as unknown as PostWithAuthor)
        : null;
    },

    async update(postId: string, postData: Post): Promise<Post | null> {
      const updatedPost = await PostRepositoryModel.findByIdAndUpdate(
        postId,
        { ...postData, updated_at: Date.now() },
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
