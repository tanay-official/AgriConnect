import express from "express";
import {
  getUserOne,
  getUser,
  deleteUser,
  getUsersForSidebar,
} from "../controller/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getUser);
router.get("/single/:id", protectRoute, getUserOne);
router.delete("/delete/:userid", protectRoute, deleteUser);
router.get("/all", protectRoute, getUsersForSidebar);

export default router;
