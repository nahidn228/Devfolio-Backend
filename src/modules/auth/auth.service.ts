import { prisma } from "../../config/db";
import { Prisma, User } from "@prisma/client";
import AppError from "../../error/AppError";
import status from "http-status";

const loginWithEmailAndPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found!", "");
  }

  if (password === user.password) {
    return user;
  } else {
    throw new AppError(status.BAD_REQUEST, "Password is incorrect!", "");
  }
};

const authWithGoogle = async (data: Prisma.UserCreateInput) => {
  let user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data,
    });
  }

  return user;
};

const resetPassword = async ({
  email,
  password,
  newPassword,
}: {
  email: string;
  password: string;
  newPassword: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found!", "");
  }

  if (password !== user.password) {
    throw new AppError(status.BAD_REQUEST, "Password is incorrect!", "");
  }

  const updatePassword = await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: newPassword,
    },
  });

  return user;
};
const forgetPassword = async ({
  email,
  password,
  phone,
}: {
  email: string;
  password: string;
  phone: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found!", "");
  }

  if (phone !== user.phone) {
    throw new AppError(status.BAD_REQUEST, "Something went Wrong!", "");
  }

  const updatePassword = await prisma.user.update({
    where: {
      email,
    },
    data: {
      password
    },
  });

  return user;
};

export const AuthService = {
  loginWithEmailAndPassword,
  authWithGoogle,
  resetPassword,
  forgetPassword
};
