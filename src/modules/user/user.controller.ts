import { Request, Response } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/SendResponse";
import status from "http-status";
import AppError from "../../error/AppError";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUser(req.body);

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: true,
      message: "Oops...! User not Registered ",
      data: error,
    });
  }
};

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllFromDB();

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "User Retrieved successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: true,
      message: "Oops...! User not Retrieved ",
      data: error,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      throw new AppError(status.NOT_FOUND, "User not found", "");
    }
    const result = await UserService.getUserById(id);
    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "User Retrieved successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: true,
      message: "Oops...! User not Retrieved ",
      data: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      throw new AppError(status.NOT_FOUND, "Post not found", "");
    }
    const result = await UserService.updateUser(id, req.body);
    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "User Updated successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: true,
      message: "Oops...! Something went wrong ",
      data: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      throw new AppError(status.NOT_FOUND, "Post not found", "");
    }
    const result = await UserService.deleteUser(id);
    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "User Deleted successfully",
      data: null,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: true,
      message: "Oops...! Something went wrong  ",
      data: error,
    });
  }
};

export const UserController = {
  createUser,
  getAllFromDB,
  getUserById,
  updateUser,
  deleteUser,
};
