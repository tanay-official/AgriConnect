import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderByFarmer,
} from "../controller/order.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createOrder);
router.get("/all", protectRoute, getOrders);
router.get("/update", protectRoute, updateOrderByFarmer);

export default router;
