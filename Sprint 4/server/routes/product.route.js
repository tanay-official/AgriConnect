import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createProduct,
  getAllProducts,
  deleteProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.get("/all", getAllProducts);
router.post("/create", protectRoute, createProduct);
router.delete("/delete/:id", protectRoute, deleteProduct);

export default router;
