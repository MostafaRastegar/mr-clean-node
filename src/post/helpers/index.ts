import Post, { PostWithAuthor } from "@/post/models/Post";
import { IPostService } from "@/post/services/IPostService";
import responseFormatter from "@/utils/responseFormatter";
import checkUserId from "@/utils/checkUserId";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RequestWithUser } from "@/app/middlewares/authMiddleware";

export async function checkPostIsExist(
  postService: IPostService,
  postId: string,
  res: Response
): Promise<PostWithAuthor | null> {
  const postDetail = await postService.getPostById(postId);
  if (!postDetail) {
    responseFormatter(res)({
      message: "Post not found.",
      code: StatusCodes.NOT_FOUND,
    });
  }
  return postDetail;
}
export async function checkPostCreateByUser(
  postService: IPostService,
  postId: string,
  res: Response,
  req: Request
): Promise<boolean> {
  const postDetail = await checkPostIsExist(postService, postId, res);
  if (postDetail) {
    return checkUserId(
      postDetail._author.id.toString(),
      req as RequestWithUser,
      res
    );
  }
  return false;
}
