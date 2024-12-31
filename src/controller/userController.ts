import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/prisma";
import * as bcrypt from "bcrypt";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 15);

    const newUser = await prisma.user.create({
      data: {
        user_id: "user_" + crypto.randomUUID(),
        email,
        name,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({
      include: { products: true },
    });

    res.status(users ? 200 : 404).json({
      message: "Users fetched successfully",
      result: users,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.params;

    const deletedUser = await prisma.user.delete({
      where: {
        user_id,
      },
    });

    res.status(deletedUser ? 200 : 400).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};
