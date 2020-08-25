const jwt = require("jsonwebtoken");

const constants = require("../../variables/constants.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ message: "Please provide credentials" });

  jwt.verify(token, constants.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ error: "Invalid token" });
    } else {
      req.decodedToken = decodedToken;
      next();
    }
  });
};
