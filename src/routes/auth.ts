import { Router } from "express";
import { signUp } from "../controllers/auth";

const router = Router();

// POST auth/signup
router.post("/signup", signUp);

export default router;