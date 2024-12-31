import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../controller/productController";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

export default router;
