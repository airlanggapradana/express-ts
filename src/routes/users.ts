import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
} from "../controller/userController";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.delete("/:user_id", deleteUser);

export default router;
