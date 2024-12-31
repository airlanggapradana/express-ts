import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controller/productController";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/:user_id", createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
