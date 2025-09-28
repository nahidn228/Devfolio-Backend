import { Project, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createProject = async (
  payload: Prisma.ProjectCreateInput
): Promise<Project> => {
  const result = await prisma.project.create({
    data: payload,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return result;
};

const getAllProjects = async ({
  page = 1,
  limit = 10,
  search,
  isFeatured,
  tags,
}: {
  page?: number;
  limit?: number;
  search?: string;
  isFeatured?: boolean;
  tags?: string[];
}) => {
  const skip = (page - 1) * limit;

  const where: any = {
    AND: [
      search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      },
      typeof isFeatured === "boolean" && { isFeatured },
      tags && tags.length > 0 && { tags: { hasEvery: tags } },
    ].filter(Boolean),
  };

  const result = await prisma.project.findMany({
    skip,
    take: limit,
    where,
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.project.count({ where });

  return {
    data: result,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getProjectById = async (id: number) => {
  const result = await prisma.project.findUnique({
    where: { id },
    include: { author: true },
  });

  return result;
};

const updateProject = async (id: number, data: Partial<any>) => {
  return prisma.project.update({ where: { id }, data });
};

const deleteProject = async (id: number) => {
  return prisma.project.delete({ where: { id } });
};

const getProjectStat = async () => {
  return await prisma.$transaction(async (tx) => {
    const aggregates = await tx.project.aggregate({
      _count: true,
    });

    const featuredCount = await tx.project.count({
      where: {
        isFeatured: true,
      },
    });

    const topFeatured = await tx.project.findFirst({
      where: { isFeatured: true },
      orderBy: { createdAt: "desc" },
    });

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const lastWeekProjectCount = await tx.project.count({
      where: {
        createdAt: {
          gte: lastWeek,
        },
      },
    });

    return {
      stats: {
        totalProjects: aggregates._count ?? 0,
      },
      featured: {
        count: featuredCount,
        topProject: topFeatured,
      },
      lastWeekProjectCount,
    };
  });
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectStat,
};
