import { Request, Response } from "express";
import { PostService } from "./post.service";
import { sendResponse } from "../../utils/SendResponse";
import status from "http-status";
import AppError from "../../error/AppError";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.createPost(req.body);
    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "Post created successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: "Oops...! Something went wrong. Post not created",
      data: error,
    });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
      : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    const result = await PostService.getAllPosts({
      page,
      limit,
      search,
      isFeatured,
      tags,
    });

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Posts fetched successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: "Oops...! Something went wrong. Failed to fetch posts",
      data: error,
    });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      throw new AppError(status.NOT_FOUND, "Post not found", "");
    }
    const post = await PostService.getPostById(id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Post fetched successfully",
      data: post,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: "Oops...! Failed to fetch post",
      data: error,
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      throw new AppError(status.NOT_FOUND, "Post not found", "");
    }
    const post = await PostService.updatePost(id, req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: "Oops...! Post not updated",
      data: error,
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      throw new AppError(status.NOT_FOUND, "Post not found", "");
    }
    await PostService.deletePost(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Post deleted successfully",
      data: null,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: "Oops...! Post not deleted",
      data: error,
    });
  }
};

const getBlogStat = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getBlogStat();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Blog stats fetched successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: "Oops...! Failed to fetch stats",
      data: error,
    });
  }
};

export const PostController = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getBlogStat,
};
