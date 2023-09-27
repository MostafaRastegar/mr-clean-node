require("dotenv").config(); // loading env variables
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import IUserService from "@/user/services/UserService";
import User from "@/user/models/User";

function authMiddleware(userService: IUserService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    const authorization = req.header("Authorization");

    if (!secretKey || !authorization) {
      return res.status(401).json({ message: "Token not found" });
    }

    try {
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, secretKey) as User;
      const user = await userService.getUserByEmail(decoded.email);
      if (!user) {
        return res.status(403).json({ message: "Invalid token" });
      }
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
  };
}

export default authMiddleware;
