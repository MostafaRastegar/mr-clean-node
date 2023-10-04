require("dotenv").config(); // loading env variables
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserWithId } from "@/user/models/User";
import UserService from "@/user/services/UserService";
import { UserRepository } from "@/user/infra";

export interface RequestWithUser extends Request {
  user: UserWithId;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  const authorization = req.header("authorization");
  const userService = UserService(UserRepository);

  if (!secretKey || !authorization) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey) as UserWithId;
    const user = decoded as UserWithId;
    const userIsExist = await userService.getUserById(user.id.toString());
    if (!user || !userIsExist) {
      return res.status(403).json({ message: "Invalid token" });
    }
    (req as RequestWithUser).user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
