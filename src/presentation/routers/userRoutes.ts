import express from "express";

const router = express.Router();

import UserController from "../../core/user/controllers/UserController";
import UserService from "../../core/user/services/UserService";
import UserRepository from "../../infrastractures/User/UserRepository";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
