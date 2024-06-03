// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
// ! -----------------------------------------------------------

const booksRouter = express.Router();

/**
 * Description: Retrieves basic information for all books.
 * Method: GET
 * Route: /books
 */
const getAllBooksBasicAPI = require("./getAllBooksBasicAPI");
booksRouter.get("/", getAllBooksBasicAPI);

/**
 * Description: Retrieves a single book based on either book_id or book_title.
 * Method: GET
 * Route: /books/book
 *
 * Note: You must send either book_id or book_title in the req.body.
 * Example req.body: { book_id: 1 } or { book_title: "Book Title" }
 */
const getSingleBookAPI = require("./getSingleBookAPI");
booksRouter.get("/book", getSingleBookAPI);

module.exports = booksRouter;
