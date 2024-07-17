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

/**
 * Description: Updates book information based on book_id and request body data.
 * Method: PATCH
 * Route: /books/:book_id/update
 * Middleware: requireUser - Ensures user is authenticated.
 * Request Body: Contains fields to update book information.
 * Response: Returns a message indicating update success and the updated book object.
 * Throws: BookNotFoundErrorAPI if the specified book_id does not exist.
 *         NotAuthorizedErrorAPI if the logged-in user is not authorized to update the book information.
 *         Error if an error occurs while updating book information in the database.
 */
const updateBookAPI = require("./updateBookAPI");
booksRouter.patch("/:book_id/update", requireUser, updateBookAPI);

/**
 * Description: Deletes a specific book.
 * Method: DELETE
 * Route: /books/:book_id/delete
 * Authorization: Requires user to be logged in and authorized (either the user themselves or an admin).
 * Response: Returns a message confirming the deletion and the deleted user's username.
 * Throws: BookNotFoundErrorAPI if the specified user_id does not exist.
 */
const deleteBookAPI = require("./deleteBookAPI");
booksRouter.delete("/:book_id/delete", requireUser, deleteBookAPI);

module.exports = booksRouter;
