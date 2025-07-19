import express from "express";
import { loginUser, signInUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signin", signInUser);

export default router;
