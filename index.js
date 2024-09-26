import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";

dotenv.config();

connectDB();

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World! This is the first project.");
});

app.listen(port, () => {
  console.log(`Hello from server side, port ${port}!`);
});
