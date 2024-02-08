import express from "express";
import type {Express} from "express"

const app: Express = express();

app.use("/", (req, res) => {
  console.log("server working");
});

app.listen(8080);