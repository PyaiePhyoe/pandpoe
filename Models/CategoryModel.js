import mongoose from "mongoose";
import Joi from "joi";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(32).required(),
  });

  return schema.validate(category);
}

export { Category, categorySchema, validateCategory };
