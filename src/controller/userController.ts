import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import * as bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
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
    res.status(500).send({
      message: "Failed to create user",
      error: error,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { products: true },
    });

    res.status(users ? 200 : 404).json({
      message: "Users fetched successfully",
      result: users,
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to fetch users",
      error: error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const user = await prisma.user.findUnique({
      where: { user_id },
      include: { products: true },
    });

    res.status(user ? 200 : 404).json({
      message: "User fetched successfully",
      result: user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to fetch user",
      error: error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
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
    res.status(500).send({
      message: "Failed to delete user",
      error: error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const { email, name, password } = req.body;

    const updatedUser = await prisma.user.update({
      where: { user_id },
      data: {
        email,
        name,
        password,
      },
    });

    res.status(updatedUser ? 200 : 400).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to update user",
      error: error,
    });
  }
};
