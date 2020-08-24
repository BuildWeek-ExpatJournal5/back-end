const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
