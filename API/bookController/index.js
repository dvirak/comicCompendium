// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const requireUser = require("../Authentication/requireUser");
// ! -----------------------------------------------------------

const booksRouter = express.Router();
const table_name = "book";

/**
 * Description: Retrieves basic information for all books.
 * Method: GET
 * Route: /books
 * Response: Returns a list of all books with basic information.
 */
const getAllBooksBasicAPI = require("./getAllBooksBasicAPI");
booksRouter.get("/", getAllBooksBasicAPI);

/**
 * Description: Retrieves a single book based on either book_id as a param or book_title as a query.
 * Method: GET
 * Route: /books/book
 * Request Params: `book_id` (optional) - ID of the book.
 * Request Query: `title` (optional) - The title of the book if `book_id` is not provided.
 * Response: Returns a single book's details based on the provided `book_id` or `title`.
 */
const getSingleBookAPI = require("./getSingleBookAPI");
booksRouter.get("/book/:book_id?", getSingleBookAPI);

/**
 * Description: Creates a new book.
 * Method: POST
 * Route: /books/add
 * Middleware: requireUser - Ensures user is authenticated.
 * Request Body: Requires fields such as title (string), publish_date (YYYY-MM-DD), description, print_length (int), etc.
 * Response: Returns the created book information and a success message.
 */
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
 * Response: Returns a success message and the updated book details.
 * Throws: BookNotFoundErrorAPI if the book with the specified `book_id` does not exist.
 *         NotAuthorizedErrorAPI if the user is not authorized to update the book.
 */
booksRouter.patch("/book/:book_id/update", requireUser, createOrUpdateBookAPI);

/**
 * Description: Deletes a specific book.
 * Method: DELETE
 * Route: /books/:book_id/delete
 * Middleware: requireUser - Ensures user is authenticated.
 * Request Params: `book_id` - The ID of the book to be deleted.
 * Response: Returns a confirmation message after successful deletion.
 * Throws: BookNotFoundErrorAPI if the specified book is not found.
 */
const deleteBookAPI = require("./deleteBookAPI");
booksRouter.delete("/book/:book_id/delete", requireUser, deleteBookAPI);

/**
 * Description: Retrieves related items for a specific book based on query parameters.
 * Method: GET
 * Route: /books/book/:book_id/relation
 * Request Params: `book_id` - The ID of the book to get related items for.
 * Request Query: At least one relation type is required (e.g., `author`, `genre`, `illustrator`).
 * Response: Returns a list of related items for the specified book.
 *
 * Example request: /books/book/5/relation/genre&author
 */
const { getRelationItemsAPI } = require("../RelationshipFunctionsAPI");
booksRouter.get("/book/:book_id/relation/?", (req, res, next) => {
  getRelationItemsAPI(req, res, next, table_name);
});

/**
 * Description: Deletes a specific relation between a book and a related item (e.g., author, genre, illustrator).
 * Method: DELETE
 * Route: /books/book/:book_id?/relation/delete/:relation/:item_id?
 *
 * Request Params:
 * - `book_id` (optional): The ID of the book. If not provided, `title` can be used as a query parameter.
 * - `relation`: The type of relation to be deleted (e.g., author, genre, illustrator).
 * - `item_id` (optional): The ID of the related item. If not provided, `item_name` can be used as a query parameter.
 *
 * Request Query (alternative options):
 * - `title` (optional): The title of the book if `book_id` is not provided.
 * - `item_name` (optional): The name of the related item if `item_id` is not provided.
 *
 * Response: Returns a success message confirming the relation deletion or an error message if the book or related item is not found.
 *
 * Example request (with params): /books/book/1/relation/delete/illustrator/5
 * Example request (with query): /books/book/relation/delete/illustrator?title=watchmen&item_name=ryan_north
 */
const { deleteRelationAPI } = require("../RelationshipFunctionsAPI");
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
 * Request Query: Accepts one or more category types (e.g., `author`, `genre`, `illustrator`) with their corresponding values.
 * Response: Returns a list of books matching the specified categories.
 *
 * Example Request: /books/category/?illustrator=erica_henderson&author=ryan_north
 */
const getBooksByCategoryAPI = require("./getBooksByCategoryAPI");
booksRouter.get("/category/?", (req, res, next) => {
  getBooksByCategoryAPI(req, res, next);
});

module.exports = booksRouter;

// booksRouter.post(
//   "/book/:book_id/relation/add",
//   requireUser,
//   (req, res, next) => {
//     createRelationsAPI(req, res, next);
//   }
// );
