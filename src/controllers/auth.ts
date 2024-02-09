import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import User from "../models/user";
import { throwError, catchError } from "../utils/error";
import type { Request, Response, NextFunction } from "express";
import type { TError } from "../utils/error";

/**
 * Middleware that create new user
 * Body content: email, password and name 
 */

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const existUser = await User.findOne({ email: req.body.email });

    // check if data base already has an user with the same email
    if (existUser) {
      throwError("An user with this e-mail already exists", 422);
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
    catchError(err as TError, next);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
      throwError("E-mail or password incorrect", 401);
      return;
    } 
    
    const comparePassword = await compare(req.body.password, user.password);

    if (!comparePassword) {
      throwError("E-mail or password incorrect", 401);
    }

    const token = sign({userId: user._id}, process.env.JWT_SECRET as string, {expiresIn: "1h"});

    res.status(200).json({ message: "Successful login", token: token});

  } catch (err) {
    catchError(err as TError, next);
  }
}
