import express, { Request, Response } from "express";
const router = express.Router();

import PostController from "../../core/post/controllers/PostController";
import PostService from "../../core/post/services/PostService";
import PostRepository from "../../infrastractures/Post/PostRepository";

const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

export default router;
