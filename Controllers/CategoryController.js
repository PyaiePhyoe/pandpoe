import { Category, validateCategory } from "../Models/CategoryModel.js";

const getCategories = async (req, res) => {
  let categories = await Category.find({});
  res.json(categories);
};

const createCategory = async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details);

  let category = await Category.findOne({ name: req.body.name });
  if (category) return res.status(400).send("Category is already created!");

  category = new Category({
    name: req.body.name,
  });

  await category.save();

  res.json(`New category "${category.name}" is created!`);
};

const getCategory = async (req, res) => {
  let category = await Category.findOne({ _id: req.params.id });
  if (!category) return res.status(401).json("Category is not found!");

  res.json(category);
};

const updateCategory = async (req, res) => {
  let category = await Category.findOne({ _id: req.params.id });
  if (!category) return res.status(401).json("Category is not found!");

  if (req.body.name) {
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).send(error.details);

    category.name = req.body.name;
  }

  await category.save();
  res.json(category);
};

const deleteCategory = async (req, res) => {
  let category = await Category.findOne({ _id: req.params.id });
  if (!category) return res.status(401).json("Category is not found!");

  await Category.deleteOne({ _id: category._id });
  res.json(`${category.name} is deleted successfully!`);
};

export {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
