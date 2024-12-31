import express, { Request, Response } from "express";
import cors from "cors";
import { data as users } from "../db";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string);
  const gender = req.query.gender as string;

  let result = users;

  if (limit) {
    result = result.slice(0, limit);
  }

  if (gender) {
    result = result.filter((user) => user.gender === gender);
  }

  res.send({
    status: "success",
    message: "Users fetched successfully",
    result,
  });
});

app.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  res.send({
    status: "success",
    message: "User fetched successfully",
    result: user,
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
