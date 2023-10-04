import { Response, Request, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { IPostService } from "@/post/services/IPostService";
import responseFormatter from "@/utils/responseFormatter";

export default (postService: IPostService) =>
  async function getPostById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const postId: string = req.params.id;
      const post = await postService.getPostById(postId);
      if (!post) {
        return responseFormatter(res)({
          message: "Post not found.",
          code: StatusCodes.NOT_FOUND,
        });
      }
      return responseFormatter(res)({
        data: post,
        message: ReasonPhrases.OK,
        code: StatusCodes.OK,
      });
    } catch (error) {
      next(error);
    }
  };
