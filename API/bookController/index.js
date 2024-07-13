// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const requireUser = require("../Authentication/requireUser");
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
booksRouter.get("/book/:book_id?", getSingleBookAPI);

/**
 * Description: Updates user information.
 * Method: PATCH
 * Route: /users/:user_id/update
 * Middleware: requireUser - Ensures user is authenticated.
 * Request Body: Contains fields to update user information.
 * Response: Returns a message indicating update success and the updated user object.
 */
const createBookAPI = require("./createBookAPI");
booksRouter.post("/add", requireUser, createBookAPI);

module.exports = booksRouter;
