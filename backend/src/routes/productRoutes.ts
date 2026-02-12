import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  getAllProductsAdmin,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { protect, adminOnly } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin routes
router.post("/", protect, adminOnly, createProduct);
router.get("/admin/all", protect, adminOnly, getAllProductsAdmin);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
