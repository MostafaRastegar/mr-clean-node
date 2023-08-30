import express from "express";
const postRouter = express.Router();

import PostController from "@root/post/apis/v1/controllers/PostController";
import PostService from "@root/post/services/PostService";
import PostRepository from "../../infra/PostRepository";

const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

postRouter.post("/", postController.createPost);
postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getPostById);
postRouter.put("/:id", postController.updatePost);
postRouter.delete("/:id", postController.deletePost);

export default postRouter;
