import express from "express";
import authMiddleware from "@/app/middlewares/authMiddleware";
const userRouter = express.Router();

import UserController from "@/user/apis/v1/controllers/UserController";
import UserService from "@/user/services/UserService";
import UserMongoRepository from "@/user/infra/mongo/UserMongoRepository";

const userRepository = new UserMongoRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete(
  "/:id",
  authMiddleware(userService),
  userController.deleteUser
);

export default userRouter;
