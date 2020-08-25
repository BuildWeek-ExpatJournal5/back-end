module.exports = requireEmail;

function requireEmail(req, res, next) {
  if (req.body.email) {
    return next();
  } else {
    return res.status(400).json({ message: "Missing required email field" });
  }
}
