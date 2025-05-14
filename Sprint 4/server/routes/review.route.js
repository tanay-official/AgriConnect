import express from "express";
import {
  createReviewByBuyer,
  getReviewsForProduct,
} from "../controller/review.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/add", protectRoute, createReviewByBuyer);
router.get("/all/:productId", getReviewsForProduct);

export default router;
