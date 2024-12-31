import express, { Request, Response } from "express";
import { data as users } from "./../../db";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string);
  const gender = req.query.gender as string;

  let result = users;

  if (limit) {
    result = result.slice(0, limit);
  }

  if (gender) {
    result = result.filter((user) => user.gender === gender);
  }

  res.status(200).send({
    status: "success",
    message: "Users fetched successfully",
    result,
  });
});

router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    res.status(404).send({
      status: "error",
      message: "User not found",
    });
  }

  res.status(200).send({
    status: "success",
    message: "User fetched successfully",
    result: user,
  });
});

router.post("/", (req: Request, res: Response) => {
  const payload: {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
  } = req.body;

  users.push(payload);

  res.status(201).send({
    status: "success",
    message: "User added successfully",
    result: payload,
  });
});

export default router;
