require("dotenv").config();
const express = require("express");
const booksRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "asugertiughfhsvduhsv" } = process.env;

module.exports = booksRouter;
