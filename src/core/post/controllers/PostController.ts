import { Request, Response } from "express";
import Post from "../models/Post";
import { IPostService } from "../models/IPostService";
import responseFormatter from "@root/presentation/utils/responseFormatter";

class PostController {
  constructor(private postService: IPostService) {
    this.postService = postService;
  }

  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const postData: Post = req.body;
      const createdPost = await this.postService.createPost(postData);
      responseFormatter({
        res,
        success: true,
        data: createdPost,
        message: "ok",
        code: 201,
      });
    } catch (error) {
      responseFormatter({
        res,
        success: false,
        data: error,
        message: "An error occurred while creating the post.",
        code: 500,
      });
    }
  }

  async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const posts = await this.postService.getAllPosts();
      responseFormatter({
        res,
        success: true,
        data: posts,
        message: "ok",
        code: 200,
      });
    } catch (error) {
      responseFormatter({
        res,
        success: false,
        data: error,
        message: "An error occurred while creating the post.",
        code: 500,
      });
    }
  }

  async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const postId: string = req.params.id;
      const post = await this.postService.getPostById(postId);
      if (!post) {
        responseFormatter({
          res,
          success: false,
          data: null,
          message: "Post not found.",
          code: 404,
        });
        return;
      }
      return responseFormatter({
        res,
        success: true,
        data: post,
        message: "ok",
        code: 200,
      });
    } catch (error) {
      responseFormatter({
        res,
        success: false,
        data: error,
        message: "An error occurred while retrieving the post.",
        code: 500,
      });
    }
  }

  async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const postId: string = req.params.id;
      const postData: Post = req.body;
      const updatedPost = await this.postService.updatePost(postId, postData);
      if (!updatedPost) {
        responseFormatter({
          res,
          success: false,
          data: null,
          message: "Post not found.",
          code: 404,
        });
      }
      responseFormatter({
        res,
        success: true,
        data: updatedPost,
        message: "ok",
        code: 200,
      });
    } catch (error) {
      responseFormatter({
        res,
        success: false,
        data: error,
        message: "An error occurred while updating the post.",
        code: 500,
      });
    }
  }

  async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const postId: string = req.params.id;
      const deleted = await this.postService.deletePost(postId);
      if (!deleted) {
        responseFormatter({
          res,
          success: false,
          data: null,
          message: "Post not found.",
          code: 404,
        });
        return;
      }
      responseFormatter({
        res,
        success: true,
        data: null,
        message: "Post deleted successfully.",
        code: 201,
      });
    } catch (error) {
      res;

      responseFormatter({
        res,
        success: false,
        data: error,
        message: "An error occurred while deleting the post.",
        code: 500,
      });
    }
  }
}

export default PostController;
