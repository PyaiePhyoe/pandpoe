import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("You are not authorized!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid user!");
  }
}

function authorizeAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else return res.status(401).send("You are not an admin!");
}

export { authenticate, authorizeAdmin };
