import express from "express";
import { signUp, signIn, logOut } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/logout", logOut);

export default router;
