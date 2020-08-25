const jwt = require("jsonwebtoken");
const constants = require("../../variables/constants.js");
module.exports = signToken;

function signToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const secret = constants.JWT_SECRET;

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}
