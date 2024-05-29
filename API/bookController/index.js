// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
// ! -----------------------------------------------------------

const booksRouter = express.Router();

/**
 * Description: Retrieves basic information for all books.
 * Method: GET
 * Route: /books/all-books-basic-info
 */
const getAllBooksBasicAPI = require("./getAllBooksBasicAPI");
booksRouter.use("/", getAllBooksBasicAPI);

module.exports = booksRouter;
