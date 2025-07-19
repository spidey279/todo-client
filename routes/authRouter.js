import express from "express";
import { loginUser, signInUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/api/login", loginUser);
router.post("/api/signin", signInUser);

export default router;
