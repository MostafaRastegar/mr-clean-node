import { Request, Response } from "express";
import Post from "../models/Post";
import { IPostService } from "../models/IPostService";
import responseFormatter from "@root/presentation/utils/responseFormatter";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
class PostController {
  constructor(private postService: IPostService) {
    this.postService = postService;
  }

  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const postData: Post = req.body;
      const createdPost = await this.postService.createPost(postData);
      responseFormatter(res)({
        data: createdPost,
        message: ReasonPhrases.OK,
        code: StatusCodes.CREATED,
      });
    } catch (error) {
      responseFormatter(res)({
        data: error,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async getAllPosts(_req: Request, res: Response): Promise<void> {
    try {
      const posts = await this.postService.getAllPosts();
      responseFormatter(res)({
        data: posts,
        message: ReasonPhrases.OK,
        code: StatusCodes.OK,
      });
    } catch (error) {
      responseFormatter(res)({
        data: error,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const postId: string = req.params.id;
      const post = await this.postService.getPostById(postId);
      if (!post) {
        responseFormatter(res)({
          message: "Post not found.",
          code: StatusCodes.NOT_FOUND,
        });
        return;
      }
      return responseFormatter(res)({
        data: post,
        message: ReasonPhrases.OK,
        code: StatusCodes.OK,
      });
    } catch (error) {
      responseFormatter(res)({
        data: error,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const postId: string = req.params.id;
      const postData: Post = req.body;
      const updatedPost = await this.postService.updatePost(postId, postData);
      if (!updatedPost) {
        responseFormatter(res)({
          message: "Post not found.",
          code: StatusCodes.NOT_FOUND,
        });
      }
      responseFormatter(res)({
        data: updatedPost,
        message: ReasonPhrases.OK,
        code: StatusCodes.OK,
      });
    } catch (error) {
      responseFormatter(res)({
        data: error,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const postId: string = req.params.id;
      const deleted = await this.postService.deletePost(postId);
      if (!deleted) {
        responseFormatter(res)({
          message: "Post not found.",
          code: StatusCodes.NOT_FOUND,
        });
        return;
      }
      responseFormatter(res)({
        message: "Post deleted successfully.",
        code: StatusCodes.CREATED,
      });
    } catch (error) {
      res;

      responseFormatter(res)({
        data: error,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export default PostController;
