import { Response, Request, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { IPostService } from "@/post/services/IPostService";
import responseFormatter from "@/utils/responseFormatter";
import { checkPostCreateByUser } from "@/post/helpers";

export default (postService: IPostService) =>
  async function deletePost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const postId: string = req.params.id;
      const postCreateByUser = await checkPostCreateByUser(
        postService,
        postId,
        res,
        req
      );
      if (postCreateByUser) {
        await postService.deletePost(postId);
        return responseFormatter(res)({
          message: "Post deleted successfully.",
          code: StatusCodes.CREATED,
        });
      }
    } catch (error) {
      next(error);
    }
  };
