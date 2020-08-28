const express = require("express");

const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router");
const storiesRouter = require("../stories/stories-router");
const protectedContent = require("../auth/auth-mw/protectedContent");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/stories", protectedContent, storiesRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
