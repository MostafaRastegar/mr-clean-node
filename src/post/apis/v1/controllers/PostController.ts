import { Request, Response } from "express";
import Post from "@/post/models/Post";
import { IPostService } from "@/post/services/IPostService";
import responseFormatter from "@/utils/responseFormatter";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
function PostController(postService: IPostService) {
  return {
    async createPost(req: Request, res: Response): Promise<void> {
      try {
        const postData: Post = req.body;
        const createdPost = await postService.createPost(postData);
        return responseFormatter(res)({
          data: createdPost,
          message: ReasonPhrases.OK,
          code: StatusCodes.CREATED,
        });
      } catch (error) {
        return responseFormatter(res)({
          data: error,
          message: ReasonPhrases.INTERNAL_SERVER_ERROR,
          code: StatusCodes.INTERNAL_SERVER_ERROR,
        });
      }
    },

    async getAllPosts(_req: Request, res: Response): Promise<void> {
      try {
        const posts = await postService.getAllPosts();
        return responseFormatter(res)({
          data: posts,
          message: ReasonPhrases.OK,
          code: StatusCodes.OK,
        });
      } catch (error) {
        return responseFormatter(res)({
          data: error,
          message: ReasonPhrases.INTERNAL_SERVER_ERROR,
          code: StatusCodes.INTERNAL_SERVER_ERROR,
        });
      }
    },

    async getPostById(req: Request, res: Response): Promise<void> {
      try {
        const postId: string = req.params.id;
        const post = await postService.getPostById(postId);
        if (!post) {
          return responseFormatter(res)({
            message: "Post not found.",
            code: StatusCodes.NOT_FOUND,
          });
        }
        return responseFormatter(res)({
          data: post,
          message: ReasonPhrases.OK,
          code: StatusCodes.OK,
        });
      } catch (error) {
        return responseFormatter(res)({
          data: error,
          message: ReasonPhrases.INTERNAL_SERVER_ERROR,
          code: StatusCodes.INTERNAL_SERVER_ERROR,
        });
      }
    },

    async updatePost(req: Request, res: Response): Promise<void> {
      try {
        const postId: string = req.params.id;
        const postData: Post = req.body;
        const updatedPost = await postService.updatePost(postId, postData);
        if (!updatedPost) {
          return responseFormatter(res)({
            message: "Post not found.",
            code: StatusCodes.NOT_FOUND,
          });
        }
        return responseFormatter(res)({
          data: updatedPost,
          message: ReasonPhrases.OK,
          code: StatusCodes.OK,
        });
      } catch (error) {
        return responseFormatter(res)({
          data: error,
          message: ReasonPhrases.INTERNAL_SERVER_ERROR,
          code: StatusCodes.INTERNAL_SERVER_ERROR,
        });
      }
    },

    async deletePost(req: Request, res: Response): Promise<void> {
      try {
        const postId: string = req.params.id;
        const deleted = await postService.deletePost(postId);
        if (!deleted) {
          return responseFormatter(res)({
            message: "Post not found.",
            code: StatusCodes.NOT_FOUND,
          });
        }
        return responseFormatter(res)({
          message: "Post deleted successfully.",
          code: StatusCodes.CREATED,
        });
      } catch (error) {
        res;

        return responseFormatter(res)({
          data: error,
          message: ReasonPhrases.INTERNAL_SERVER_ERROR,
          code: StatusCodes.INTERNAL_SERVER_ERROR,
        });
      }
    },
  };
}

export default PostController;
