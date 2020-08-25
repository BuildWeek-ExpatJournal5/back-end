module.exports = validateUserFields;

function validateUserFields(req, res, next) {
  if (!req.body)
    return res.status(400).json({ message: "Please provide credentials" });
  if (!req.body.username || !req.body.password)
    return res
      .status(400)
      .json({ message: "Missing credentials, please fill all fields" });
  next();
}
