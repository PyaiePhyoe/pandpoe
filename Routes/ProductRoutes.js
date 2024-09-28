import express from "express";
import formidable from "express-formidable";
import { createProduct } from "../Controllers/ProductController.js";
import { authenticate, authorizeAdmin } from "../Middleware/Auth.js";

const router = express.Router();

router
  .route("/create")
  .post(authenticate, authorizeAdmin, formidable(), createProduct);

export default router;
