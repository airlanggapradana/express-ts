import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controller/userController";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.delete("/:user_id", deleteUser);
router.put("/:user_id", updateUser);
router.get("/:user_id", getUserById);

export default router;
