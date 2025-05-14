import express from "express";
import {
  sendMessage,
  getConversationLists,
  getMessges,
} from "../controller/message.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessges);

router.post("/send/:id", protectRoute, sendMessage);

router.get("/conversations", protectRoute, getConversationLists);

export default router;
