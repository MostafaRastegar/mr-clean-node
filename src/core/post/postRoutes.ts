import { Request, Response, Router } from "express";

import PostController from "./controllers/PostController";
import PostService from "./services/PostService";
import PostRepository from "../../infrastractures/Post/PostRepository";

const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

const postRoutes = (router: Router): Router => {
  router.post("/", (req: Request, res: Response) => {
    return postController.createPost(req, res);
  });
  router.get("/", (req: Request, res: Response) =>
    postController.getAllPosts(req, res)
  );
  router.get("/:id", (req: Request, res: Response) =>
    postController.getPostById(req, res)
  );
  router.put("/:id", (req: Request, res: Response) =>
    postController.updatePost(req, res)
  );
  router.delete("/:id", (req: Request, res: Response) =>
    postController.deletePost(req, res)
  );
  return router;
};

export default postRoutes;
