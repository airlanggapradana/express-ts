import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import * as bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      const isPasswordMatch = bcrypt.compareSync(
        password,
        existingUser.password
      );

      if (isPasswordMatch) {
        const { password, ...rest } = existingUser;
        res.status(200).send({
          message: "User logged in successfully",
          result: rest,
        });
      } else {
        res.status(401).send({
          message: "Invalid password",
        });
      }
    } else {
      res.status(401).send({
        message: "Email not found",
      });
    }
  } catch (error: unknown) {
    res.status(500).send({
      message: error,
    });
  }
};
