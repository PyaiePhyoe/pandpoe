import mongoose from "mongoose";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlenght: 3,
      maxlength: 20,
      required: true,
    },

    email: {
      type: String,
      minlenght: 5,
      maxlength: 255,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      minlenght: 8,
      maxlength: 255,
      required: true,
    },

    phone: {
      type: String,
      minlenght: 8,
      maxlength: 20,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

function validateNewUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(5).max(255).email().required(),
    phone: Joi.string().min(8).max(20).required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(user);
}

function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(user);
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}

function generateAuthToken(res, user) {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "30d",
  });
  res.header("x-auth-token", token);
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "Development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
}

function deleteAuthToken(res) {
  res.cookie("JWT", "", {
    httyOnly: true,
    expires: new Date(0),
  });
}

export {
  User,
  validateNewUser,
  validateLogin,
  hashPassword,
  generateAuthToken,
  deleteAuthToken,
};
