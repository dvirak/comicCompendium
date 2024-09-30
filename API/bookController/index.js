// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const requireUser = require("../Authentication/requireUser");
const {
  getRelationItemsAPI,
  createRelationsAPI,
  deleteRelationAPI,
} = require("../RelationshipFunctionsAPI");
// ! -----------------------------------------------------------

const booksRouter = express.Router();
const table_name = "book";

/**
 * Description: Retrieves basic information for all books.
 * Method: GET
 * Route: /books
 */
const getAllBooksBasicAPI = require("./getAllBooksBasicAPI");
booksRouter.get("/", getAllBooksBasicAPI);

/**
 * Description: Retrieves a single book based on either book_id as a param or book_title as a query.
 * Method: GET
 * Route: /books/book
 *
 */
const getSingleBookAPI = require("./getSingleBookAPI");
booksRouter.get("/book/:book_id?", getSingleBookAPI);

/**
 * Description: creates a new book.
 * Method: POST
 * Route: /books/add
 * Request Body: Requires title (string), publish_date (string formatted as "YYYY-MM-DD"), description (string), print_length (int), series_volume (string), cover_image (string).
 * Response: Returns an array containing book info and a message.
 */
// const createBookAPI = require("./createBookAPI");
// booksRouter.post("/add", requireUser, createBookAPI);
const createOrUpdateBookAPI = require("./createOrUpdateBookAPI");
booksRouter.post("/add", requireUser, (req, res, next) => {
  createOrUpdateBookAPI(req, res, next);
});

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
//! TODO: UPDATE to make/add/edit relations, then we dont need to have a createRelationsRoute
const updateBookAPI = require("./updateBookAPI");
booksRouter.patch("/book/:book_id/update", requireUser, createOrUpdateBookAPI);

/**
 * Description: Deletes a specific book.
 * Method: DELETE
 * Route: /books/:book_id/delete
 * Authorization: Requires user to be logged in and authorized (either the user themselves or an admin).
 * Response: Returns a message confirming the deletion and the deleted user's username.
 * Throws: BookNotFoundErrorAPI if the specified user_id does not exist.
 */
const deleteBookAPI = require("./deleteBookAPI");
booksRouter.delete("/book/:book_id/delete", requireUser, deleteBookAPI);

/**
 * Description: Retrieves related items for a specific book based on query parameters.
 * Method: GET
 * Route: /books/book/:book_id/relation
 * Request Params: `id` specifies the book to get related items for.
 * Request Query: At least one relation type is required (e.g., `author`, `genre`, `illustrator`). Additional relation types can be added as query parameters if supported.
 * Response: Returns a list of related items for the specified book, including details such as relation type, ID, and name.
 *
 * Example request: /books/book/5/relation/genre&author
 */
booksRouter.get("/book/:book_id/relation/?", (req, res, next) => {
  getRelationItemsAPI(req, res, next, table_name);
});

booksRouter.post(
  "/book/:book_id/relation/add",
  requireUser,
  (req, res, next) => {
    createRelationsAPI(req, res, next);
  }
);

booksRouter.delete(
  "/book/:book_id?/relation/delete/:relation/:item_id?",
  requireUser,
  (req, res, next) => {
    deleteRelationAPI(req, res, next);
  }
);

/**
 * Description: Retrieves books based on category filters specified as query parameters.
 * Method: GET
 * Route: /books/category
 * Request Query: One or more category types (e.g., `author`, `genre`, `illustrator`) with their respective values. Each query parameter should match a category filter to apply.
 * Response: Returns a list of books that match the specified category filters.
 *
 * Example Request: /books/category/?illustrator=erica_henderson&author=ryan_north
 * */
const getBooksByCategoryAPI = require("./getBooksByCategoryAPI");
booksRouter.get("/category/?", (req, res, next) => {
  getBooksByCategoryAPI(req, res, next);
});

module.exports = booksRouter;
