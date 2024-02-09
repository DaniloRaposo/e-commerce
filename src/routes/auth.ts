import { Router } from "express";
import { createUser } from "../controllers/auth";

const router = Router();

// POST auth/signup
router.post("/signup", createUser);

export default router;