import { verify } from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { throwError } from "../utils/error";
import type { TError } from "../utils/error";
import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const authenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    throwError("Not authenticated", 401);
    return;
  }

  const token = authHeader.replace("Bearer ", "");
  let decoder: JwtPayload;

  try {
    decoder = verify(token, process.env.JWT_SECRET ?? "") as JwtPayload;
  } catch (err) {
    throwError((err as TError).message, 500);
    return;
  }

  if (!decoder) {
    throwError("user not authenticated", 401);
    return;
  }

  req.userId = decoder.userId;
  next();
}

export default authenticated