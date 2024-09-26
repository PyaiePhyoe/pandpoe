import express from "express";
import {
  createUser,
  loginUser,
  getUsers,
} from "../Controllers/UserController.js";

const router = express.Router();

router.route("/create").post(createUser);
router.route("/login").post(loginUser);
router.route("/all").get(getUsers);

export default router;
