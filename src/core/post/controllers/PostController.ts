import { Request, Response } from "express";
import Post from "../models/Post";
import { IPostService } from "../models/IPostService";

class PostController {
  constructor(private postService: IPostService) {
    this.postService = postService;
  }

  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const postData: Post = req.body;
      const createdPost = await this.postService.createPost(postData);
      res.status(201).json(createdPost);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the post." });
    }
  }

  async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const posts = await this.postService.getAllPosts();
      res.json(posts);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the posts." });
    }
  }

  async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const postId: string = req.params.id;
      const post = await this.postService.getPostById(postId);
      if (!post) {
        res.status(404).json({ error: "Post not found." });
        return;
      }
      res.json(post);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the post." });
    }
  }

  async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const postId: string = req.params.id;
      const postData: Post = req.body;
      const updatedPost = await this.postService.updatePost(postId, postData);
      if (!updatedPost) {
        res.status(404).json({ error: "Post not found." });
        return;
      }
      res.json(updatedPost);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the post." });
    }
  }

  async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const postId: string = req.params.id;
      const deleted = await this.postService.deletePost(postId);
      if (!deleted) {
        res.status(404).json({ error: "Post not found." });
        return;
      }
      res.json({ message: "Post deleted successfully." });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the post." });
    }
  }
}

export default PostController;
