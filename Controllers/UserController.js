import {
  deleteAuthToken,
  generateAuthToken,
  hashPassword,
  User,
  validateLogin,
  validateNewUser,
} from "../Models/UserModel.js";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  const { error } = validateNewUser(req.body);
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

  generateAuthToken(res, user);
  await user.save();
  res.send({
    id: user._id,
    username: user.username,
    email: user.email,
    phone: user.phone,
  });
};

const loginUser = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Your email has not registered!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Password!");

  generateAuthToken(res, user);
  res.send(`Hi ${user.username}, you have logged in successfully!`);
};

const logoutUser = async (req, res) => {
  deleteAuthToken(res);
  res.send("You have logged out successfully!");
};

const getUsers = async (req, res) => {
  let users = await User.find({});
  res.json(users);
};

const userProfile = async (req, res) => {
  let profile = await User.findById(req.user._id);
  if (!profile) return res.status(401).send("User is not found!");

  res.json({
    id: profile._id,
    username: profile.username,
    email: profile.email,
    phone: profile.phone,
  });
};

const updateProfile = async (req, res) => {
  let profile = await User.findById(req.user._id);
  if (!profile) return res.status(401).send("User is not found!");

  if (req.body.username) profile.username = req.body.username;
  if (req.body.email) profile.email = req.body.email;
  if (req.body.phone) profile.phone = req.body.phone;
  if (req.body.password) {
    profile.password = await hashPassword(req.body.password);
  }

  await profile.save();

  res.json({
    id: profile._id,
    username: profile.username,
    email: profile.email,
    phone: profile.phone,
  });
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(401).send("User is not found!");
  res.json(user);
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(401).send("User is not found!");

  await User.deleteOne({ _id: user._id });
  res.send(`${user.username} has been deleted!`);
};

const updateUserById = async (req, res) => {
  let profile = await User.findById(req.params.id);
  if (!profile) return res.status(401).send("User is not found!");

  if (req.body.username) profile.username = req.body.username;
  if (req.body.email) profile.email = req.body.email;
  if (req.body.phone) profile.phone = req.body.phone;
  if (req.body.password) {
    profile.password = await hashPassword(req.body.password);
  }

  await profile.save();

  res.json({
    id: profile._id,
    username: profile.username,
    email: profile.email,
    phone: profile.phone,
  });
};

export {
  createUser,
  loginUser,
  logoutUser,
  getUsers,
  userProfile,
  updateProfile,
  getUser,
  updateUserById,
  deleteUser,
};
