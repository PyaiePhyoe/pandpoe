import express from "express";
import { authenticate, authorizeAdmin } from "../Middleware/Auth.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../Controllers/CategoryController.js";

const router = express.Router();

router.route("/all").get(authenticate, authorizeAdmin, getCategories);
router.route("/create").post(authenticate, authorizeAdmin, createCategory);
router
  .route("/:id")
  .get(authenticate, authorizeAdmin, getCategory)
  .put(authenticate, authorizeAdmin, updateCategory)
  .delete(authenticate, authorizeAdmin, deleteCategory);

export default router;
