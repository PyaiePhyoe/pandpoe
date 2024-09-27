import express from "express";
import {
  createUser,
  loginUser,
  getUsers,
  logoutUser,
  userProfile,
} from "../Controllers/UserController.js";
import { authenticate, authorizeAdmin } from "../Middleware/Auth.js";

const router = express.Router();

router.route("/create").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/all").get(authenticate, authorizeAdmin, getUsers);
router.route("/profile").get(authenticate, userProfile);

export default router;
