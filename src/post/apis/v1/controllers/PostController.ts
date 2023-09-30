import { Request, Response } from "express";
import Post from "@/post/models/Post";
import { IPostService } from "@/post/services/IPostService";
import responseFormatter from "@/utils/responseFormatter";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
class PostController {
  constructor(private postService: IPostService) {
    this.postService = postService;
    this.createPost = this.createPost.bind(this);
    this.getAllPosts = this.getAllPosts.bind(this);
    this.getPostById = this.getPostById.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
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
      res.cookie("JWT_TOKEN_SS_ZZ_RR_TT", "10", {
        // expires: new Date(Date.now() + 9999999),
        secure: true,
        httpOnly: true,
        maxAge: 30 * 60 * 24,
        domain: "localhost",
      });
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
      responseFormatter(res)({
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
