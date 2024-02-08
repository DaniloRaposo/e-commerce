import express from "express";
import dotenv from "dotenv";
import type {Express} from "express"

dotenv.config();

const app: Express = express();

app.use("/", (req, res) => {
  console.log("server working");
});

app.listen(process.env.PORT);