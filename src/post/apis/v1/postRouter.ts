import express from "express";
const postRouter = express.Router();

import PostController from "@/post/apis/v1/controllers/PostController";
import PostService from "@/post/services/PostService";
import { PostRepository } from "@/post/infra";

const postController = PostController(PostService(PostRepository));

postRouter.post("/", postController.createPost);
postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getPostById);
postRouter.put("/:id", postController.updatePost);
postRouter.delete("/:id", postController.deletePost);

export default postRouter;
