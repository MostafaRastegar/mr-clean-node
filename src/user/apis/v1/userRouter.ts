import express from "express";

const userRouter = express.Router();

import UserController from "@root/user/apis/v1/controllers/UserController";
import UserService from "@root/user/services/UserService";
import UserMongoRepository from "../../infra/mongo/UserMongoRepository";

const userRepository = new UserMongoRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
