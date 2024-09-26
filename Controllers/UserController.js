import { User, validateUser } from "../Models/UserModel.js";

const createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is already registered!");

  user = new User({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });

  await user.save();
  res.send(user);
};

export { createUser };
