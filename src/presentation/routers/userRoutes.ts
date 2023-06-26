import { Request, Response, Router } from "express";

import UserController from "../../core/user/controllers/UserController";
import UserService from "../../core/user/services/UserService";
import UserRepository from "../../infrastractures/User/UserRepository";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRoutes = (router: Router): Router => {
  router.post("/register", (req: Request, res: Response) => {
    return userController.registerUser(req, res);
  });

  router.post("/login", (req: Request, res: Response) =>
    userController.loginUser(req, res)
  );
  router.put("/:id", (req: Request, res: Response) =>
    userController.updateUser(req, res)
  );
  router.delete("/:id", (req: Request, res: Response) =>
    userController.deleteUser(req, res)
  );
  return router;
};

export default userRoutes;
