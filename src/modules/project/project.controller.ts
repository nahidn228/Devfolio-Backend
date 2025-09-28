import { Request, Response } from "express";

import { sendResponse } from "../../utils/SendResponse";
import status from "http-status";
import AppError from "../../error/AppError";
import { ProjectService } from "./project.service";

const createProject = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.createProject(req.body);
    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "Project created successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: "Oops...! Something went wrong. Project not created",
      data: error,
    });
  }
};

const getAllProjects = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
      : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    const result = await ProjectService.getAllProjects({
      page,
      limit,
      search,
      isFeatured,
      tags,
    });

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Projects fetched successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: "Oops...! Something went wrong. Failed to fetch Projects",
      data: error,
    });
  }
};

const getProjectById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      throw new AppError(status.NOT_FOUND, "Project not found", "");
    }
    const project = await ProjectService.getProjectById(id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Project fetched successfully",
      data: project,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: "Oops...! Failed to fetch Project",
      data: error,
    });
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      throw new AppError(status.NOT_FOUND, "Project not found", "");
    }
    const project = await ProjectService.updateProject(id, req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: "Oops...! Project not updated",
      data: error,
    });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      throw new AppError(status.NOT_FOUND, "Project not found", "");
    }
    await ProjectService.deleteProject(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Project deleted successfully",
      data: null,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: "Oops...! Project not deleted",
      data: error,
    });
  }
};

const getProjectStat = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.getProjectStat();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Project stats fetched successfully",
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

export const ProjectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectStat,
};
