import jwt from "jsonwebtoken";
import { User } from "../Models/UserModel.js";

async function authenticate(req, res, next) {
  let token = req.cookies.jwt;
  if (!token) return res.status(401).send("You are not authorized!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = await User.findById(decoded._id).select("-password");
    next();
  } catch (error) {
    res.status(400).send("Invalid user!");
  }
}

function authorizeAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).send("You are not an admin!");
  }
}

export { authenticate, authorizeAdmin };
