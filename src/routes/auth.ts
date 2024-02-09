import { Router } from "express";
import { signUp, login } from "../controllers/auth";

const router = Router();

// POST auth/signup
router.post("/signup", signUp);

// POST auth/login
router.post("/login", login);

export default router;