import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
import connectDB from "./db.js";
import UserRoutes from "./Routes/UserRoutes.js";
import CategoryRoutes from "./Routes/CategoryRoutes.js";

dotenv.config();

connectDB();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World! This is the first project.");
});

app.use("/api/users", UserRoutes);
app.use("/api/categories", CategoryRoutes);

app.listen(port, () => {
  console.log(`Hello from server side, port ${port}!`);
});
