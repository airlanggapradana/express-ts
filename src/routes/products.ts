import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controller/productController";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);

export default router;
