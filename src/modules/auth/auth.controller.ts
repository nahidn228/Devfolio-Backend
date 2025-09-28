import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/SendResponse";
import status from "http-status";

const loginWithEmailAndPassword = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginWithEmailAndPassword(req.body);
    res.status(200).json(result);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Logged in successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to login",
      data: error,
    });
  }
};

const authWithGoogle = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.authWithGoogle(req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Logged in with Google successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to login with Google",
      data: error,
    });
  }
};

export const AuthController = {
  loginWithEmailAndPassword,
  authWithGoogle,
};
