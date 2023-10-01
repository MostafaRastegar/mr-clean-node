import express from "express";
import authMiddleware from "@/app/middlewares/authMiddleware";
import UserController from "@/user/apis/v1/controllers/UserController";
import UserService from "@/user/services/UserService";
import { UserRepository } from "@/user/infra";
import validationMiddleware from "@/app/middlewares/validationMiddleware";
import {
  userValidationLoginRules,
  userValidationRegisterRules,
} from "./validator";

const userRouter = express.Router();
const userController = UserController(UserService(UserRepository));

userRouter.put("/:id", authMiddleware, userController.updateUser);
userRouter.delete("/:id", authMiddleware, userController.deleteUser);
userRouter.post(
  "/register",
  userValidationRegisterRules(),
  validationMiddleware,
  userController.registerUser
);

userRouter.post(
  "/login",
  userValidationLoginRules(),
  validationMiddleware,
  userController.loginUser
);

export default userRouter;
