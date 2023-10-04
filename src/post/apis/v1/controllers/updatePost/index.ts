import { Response, Request, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import Post from "@/post/models/Post";
import { IPostService } from "@/post/services/IPostService";
import responseFormatter from "@/utils/responseFormatter";
import { checkPostCreateByUser } from "@/post/helpers";

export default (postService: IPostService) =>
  async function updatePost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const postId: string = req.params.id;
      const postData: Post = req.body;
      const postCreateByUser = await checkPostCreateByUser(
        postService,
        postId,
        res,
        req
      );
      if (postCreateByUser) {
        const updatedPost = await postService.updatePost(postId, postData);
        return responseFormatter(res)({
          data: updatedPost,
          message: ReasonPhrases.OK,
          code: StatusCodes.OK,
        });
      }
    } catch (error) {
      next(error);
    }
  };
