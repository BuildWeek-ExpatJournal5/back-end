const router = require("express").Router();
const bcrypt = require("bcryptjs");

const users = require("./auth-model");
const signToken = require("./auth-mw/signToken");
const validateFields = require("./auth-mw/validateUserFields");
const constants = require("../variables/constants");
const requireEmail = require("./auth-mw/requireEmail");

router.post("/register", validateFields, requireEmail, (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };

  const hash = bcrypt.hashSync(user.password, constants.ROUNDS);

  user.password = hash;

  users
    .add(user)
    .then((id) => {
      res.status(201).json({ message: "User successfully created", id });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.post("/login", validateFields, (req, res) => {
  const { username, password } = req.body;

  users.selectBy({ username: username }).then(([user]) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = signToken(user);
      console.log(user);
      res.json({
        userId: user.id,
        message: "Login successful",
        token,
      });
    } else {
      res.status(401).json({ error: "invalid login attempt" });
    }
  });
});

module.exports = router;
