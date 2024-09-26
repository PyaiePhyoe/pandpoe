import { hashPassword, User, validateUser } from "../Models/UserModel.js";

const createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is already registered!");

  const hashedPassword = await hashPassword(req.body.password);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword,
  });

  await user.save();
  res.send({
    username: user.username,
    email: user.email,
    phone: user.phone,
  });
};

const getUsers = async (req, res) => {
  res.send("This is getUsers Route!");
};

export { createUser, getUsers };
