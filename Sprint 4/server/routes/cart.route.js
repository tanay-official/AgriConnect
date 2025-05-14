import express from "express";
import {
  getAllCartProducts,
  addToCart,
  removeFromCart,
} from "../controller/cart.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/all", protectRoute, getAllCartProducts);
router.post("/add", protectRoute, addToCart);
router.delete("/remove/:id", protectRoute, removeFromCart);

export default router;
