const jwt = require("jsonwebtoken");

const sign = process.env.JWT_SECRET;

function generate(data) {
  return jwt.sign(data, sign, { expiresIn: "30d" });
}

function verify(token) {
  try {
    return jwt.verify(token, sign);
  } catch {
    throw new Error("Invalid token");
  }
}

module.exports = {
  generate,
  verify,
};
