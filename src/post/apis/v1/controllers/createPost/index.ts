import { Response, Request, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RequestWithUser } from "@/app/middlewares/authMiddleware";
import Post from "@/post/models/Post";
import { IPostService } from "@/post/services/IPostService";
import responseFormatter from "@/utils/responseFormatter";

export default (postService: IPostService) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postData: Post = req.body;
      const postWithAuthor = {
        ...postData,
        _author: (req as RequestWithUser).user.id,
      };
      const createdPost = await postService.createPost(postWithAuthor);
      return responseFormatter(res)({
        data: createdPost,
        message: ReasonPhrases.OK,
        code: StatusCodes.CREATED,
      });
    } catch (error) {
      next(error);
    }
  };
