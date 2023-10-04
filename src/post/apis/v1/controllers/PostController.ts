import { IPostService } from "@/post/services/IPostService";
import createPost from "./createPost";
import getAllPosts from "./getAllPosts";
import getPostById from "./getPostById";
import updatePost from "./updatePost";
import deletePost from "./deletePost";
export default function PostController(postService: IPostService) {
  return {
    createPost: createPost(postService),
    getAllPosts: getAllPosts(postService),
    getPostById: getPostById(postService),
    updatePost: updatePost(postService),
    deletePost: deletePost(postService),
  };
}
