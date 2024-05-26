const express = require("express");
const booksRouter = express.Router();

const getBasicBookInfoAPI = require("./getBasicBookInfoAPI");
// Import other book-related API routes

booksRouter.use("/basicInfo", getBasicBookInfoAPI);
// Use other book-related API routes

module.exports = booksRouter;
