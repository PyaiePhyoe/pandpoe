import { Product, validateNewProduct } from "../Models/ProductModel.js";

const createProduct = async (req, res) => {
  const { error } = validateNewProduct(req.body);
  if (error) return res.status(401).send(error.details);

  let product = await Product.findOne({ name: req.body.name });
  if (product) return res.status(401).send(`${product} has already created!`);

  product = new Product({
    name: req.body.name,
    image: req.body.image,
    brand: req.body.brand,
    categoryId: req.body.categoryId,
    stock: req.body.stock,
    price: req.body.price,
  });

  await product.save();

  res.json(product);
};

export { createProduct };
