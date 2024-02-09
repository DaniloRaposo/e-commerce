import { hash, compare } from "bcrypt";
import User from "../models/user";
import type { Request, Response, NextFunction } from "express";
import type { TError } from "./types";

/**
 * Middleware that create new user
 * Body content: email, password and name 
 */

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const existUser = await User.findOne({ email: req.body.email });

    // check if data base already has an user with the same email
    if (existUser) {
      const error: TError = new Error("An user with this e-mail already exists");
      error.statusCode = 422;
      throw error;
    }

    const hashPassword = await hash(req.body.password, 12);

    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hashPassword,
      posts: [],
    });

    const createUser = await user.save();

    res.status(201).json({message: "user created", userId: createUser._id });

  } catch (err) {
    const error = err as TError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next (error);
  }
}