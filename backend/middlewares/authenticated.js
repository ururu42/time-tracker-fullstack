const User = require("../models/User");
const { verify } = require("../helpers/token");
const mapUser = require("../helpers/mapUser");

async function authenticated(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send({ error: "Token is missing" });
    }

    const tokenData = verify(token);
    const user = await User.findById(tokenData.id);

    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    req.user = mapUser(user);
    next();
  } catch {
    return res.status(401).send({ error: "Invalid or expired token" });
  }
}

module.exports = authenticated;
