import express, { urlencoded } from "express";

import dotenv from "dotenv";
import connectDB from "./db.js";
import UserRoutes from "./Routes/UserRoutes.js";

dotenv.config();

connectDB();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World! This is the first project.");
});

app.get("/new", (req, res) => {
  res.send("New Message.");
});

app.use("/api/users", UserRoutes);

app.listen(port, () => {
  console.log(`Hello from server side, port ${port}!`);
});
