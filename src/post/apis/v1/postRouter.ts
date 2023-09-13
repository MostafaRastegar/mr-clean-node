import express from "express";
const postRouter = express.Router();

import PostController from "@/post/apis/v1/controllers/PostController";
import PostService from "@/post/services/PostService";
import PostRepository from "@/post/infra/PostRepository";

const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

postRouter.post("/", postController.createPost);
postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getPostById);
postRouter.put("/:id", postController.updatePost);
postRouter.delete("/:id", postController.deletePost);

export default postRouter;
