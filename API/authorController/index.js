// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const requireUser = require("../Authentication/requireUser");
// ! -----------------------------------------------------------

const authorsRouter = express.Router();

/**
 * Description: Retrieves all authors.
 * Method: GET
 * Route: /authors
 */
const getAllAuthorsAPI = require("./getAllAuthorsAPI");
authorsRouter.get("/", getAllAuthorsAPI);

/**
 * Description: Retrieves a book's author based on book_id as a param or author_name as a query.
 * Method: GET
 * Route: /author/:book_id
 *
 */
const getAuthorAPI = require("./getAuthorAPI");
authorsRouter.get("/author/:author_id?", getAuthorAPI);

/**
 * Description: creates a new author.
 * Method: POST
 * Route: /author/add
 * Request Body: Requires author_name (string).
 * Response: Returns an array containing author info and a message.
 */
const createAuthorAPI = require("./createAuthorAPI");
authorsRouter.post("/add", createAuthorAPI);

module.exports = authorsRouter;
