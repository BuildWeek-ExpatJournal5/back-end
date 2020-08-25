const PORT = process.env.PORT || 5500;
const JWT_SECRET = process.env.JWT_SECRET || "shh, its a secret";
const ROUNDS = process.env.ROUNDS || 8;

module.exports = {
  PORT,
  JWT_SECRET,
  ROUNDS,
};
