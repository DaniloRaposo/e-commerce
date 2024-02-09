import { Router } from "express";
import { body } from "express-validator"
import { signUp, login } from "../controllers/auth";

const router = Router();

// POST auth/signup
router.post("/signup", [
  // validation middlewares to verify the validation of body content 
  body("email", "Invalid Email").isEmail(),
  body("password", "Password too short").isLength({min: 6}),
  body("name", "Empty name not allowed").notEmpty(),
], signUp);

// POST auth/login
router.post("/login", [
  // validation middlewares to verify the validation of body content 
  body("email", "Invalid Email").isEmail(),
  body("password", "Password too short").isLength({min: 6}),
], login);

export default router;