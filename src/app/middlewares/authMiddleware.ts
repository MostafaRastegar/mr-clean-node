require("dotenv").config(); // loading env variables
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "@/user/models/User";

export interface RequestWithUser extends Request {
  user: User;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  const authorization = req.header("Authorization");

  if (!secretKey || !authorization) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey) as User;
    const user = decoded as User;
    if (!user) {
      return res.status(403).json({ message: "Invalid token" });
    }
    (req as RequestWithUser).user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
