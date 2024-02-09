import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import type {Express, Request, Response, NextFunction} from "express"
import type { TError } from "./utils/error";

import authRouter from "./routes/auth";

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use("/auth", authRouter);

// middleware error handler
app.use((error: TError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode ?? 500).json({message: error.message, data: error?.data});
})

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  app.listen(process.env.PORT);
}).catch(err => {
  console.log(err);
})
