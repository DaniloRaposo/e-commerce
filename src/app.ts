import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import type {Express} from "express"

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

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  app.listen(process.env.PORT);
}).catch(err => {
  console.log(err);
})
