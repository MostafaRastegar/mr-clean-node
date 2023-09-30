import express from "express";
import authMiddleware from "@/app/middlewares/authMiddleware";
const userRouter = express.Router();

import UserController from "@/user/apis/v1/controllers/UserController";
import UserService from "@/user/services/UserService";
import { UserRepository } from "@/user/infra";

const userController = UserController(UserService(UserRepository));

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.put("/:id", authMiddleware, userController.updateUser);
userRouter.delete("/:id", authMiddleware, userController.deleteUser);

export default userRouter;
