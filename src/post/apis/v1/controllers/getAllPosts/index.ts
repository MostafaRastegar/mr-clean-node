import { Response, Request, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { IPostService } from "@/post/services/IPostService";
import responseFormatter from "@/utils/responseFormatter";

export default (postService: IPostService) =>
  async function getAllPosts(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const posts = await postService.getAllPosts();
      return responseFormatter(res)({
        data: posts,
        message: ReasonPhrases.OK,
        code: StatusCodes.OK,
      });
    } catch (error) {
      next(error);
    }
  };
