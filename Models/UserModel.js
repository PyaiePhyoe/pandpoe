import mongoose from "mongoose";
import Joi from "joi";

const userModel = new mongoose.Schema(
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
      maxlength: 20,
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

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(5).max(255).email().required(),
    phone: Joi.string().min(8).max(20).required(),
    password: Joi.string().min(8).max(30).required(),
  });

  return schema.validate(user);
}

const User = mongoose.model("User", userModel);

export { User, validateUser };
