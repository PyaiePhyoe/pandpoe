import mongoose from "mongoose";
import Joi from "joi";
import { categorySchema } from "./CategoryModel.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlenght: 3,
      maxlength: 255,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      minlenght: 3,
      maxlength: 255,
      required: true,
    },
    brand: {
      type: String,
      minlenght: 3,
      maxlength: 255,
      required: true,
    },
    category: {
      type: categorySchema,
      required: true,
    },
    stock: {
      type: Number,
      min: 0,
      max: 255,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      max: 255,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

function validateNewProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    image: Joi.string().min(5).max(255).email().required(),
    brand: Joi.string().min(8).max(20).required(),
    categoryId: Joi.string().required(),
    stock: Joi.number().min(0).max(20).required(),
    price: Joi.number().min(0).max(255).required(),
  });

  return schema.validate(product);
}

export { Product, validateNewProduct };
