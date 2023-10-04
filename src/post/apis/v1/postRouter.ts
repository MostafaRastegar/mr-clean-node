import express from "express";
import authMiddleware from "@/app/middlewares/authMiddleware";
import PostController from "@/post/apis/v1/controllers/PostController";
import PostService from "@/post/services/PostService";
import { PostRepository } from "@/post/infra";

const postRouter = express.Router();
const postController = PostController(PostService(PostRepository));

postRouter.post("/", authMiddleware, postController.createPost);
postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getPostById);
postRouter.put("/:id", authMiddleware, postController.updatePost);
postRouter.delete("/:id", authMiddleware, postController.deletePost);

export default postRouter;
