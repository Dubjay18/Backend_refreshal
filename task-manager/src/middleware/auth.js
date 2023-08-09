const jwt = require("jsonwebtoken");
const User = require("../models/users");

const auth = async (req, res, next) => {
  try {
    const token = req
      .header("Authorization")
      .replace("Bearer", "");
    const decoded = jwt.verify(token, "supersecret");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!User) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ message: "Please authenticate" });
  }
};

module.exports = auth;
