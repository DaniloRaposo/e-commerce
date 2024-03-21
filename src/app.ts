import express from "express";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
import type {Express, Request, Response, NextFunction} from "express"
import type { FileFilterCallback } from "multer";
import type { TError } from "./utils/error";

import authRouter from "./routes/auth";
import shopRouter from "./routes/shop";

type TCallback = (error: Error | null, parameter: string) => void;

dotenv.config();

const fileStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: TCallback) => {
    cb(null, "images");
  },
  filename: (req: Request, file: Express.Multer.File, cb: TCallback) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const acceptedFileTypes: string[] = ["image/png", "image/jpg", "image/jpeg"];

  cb(null, acceptedFileTypes.includes(file.mimetype));
};

const app: Express = express();

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "..", "images")));
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
app.use("/shop", shopRouter);

// middleware error handler
app.use((error: TError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode ?? 500).json({message: error.message, data: error?.data});
})

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  app.listen(process.env.PORT);
}).catch(err => {
  console.log(err);
})
