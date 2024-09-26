import express from "express";
import { createUser, getUsers } from "../Controllers/UserController.js";

const router = express.Router();

router.route("/").post(createUser);
router.route("/").get(getUsers);

export default router;
