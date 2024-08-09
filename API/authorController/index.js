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
 * Description: Retrieves an author based on author_id as a param or author_name as a query.
 * Method: GET
 * Route: /author/:author_id?
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

/**
 * Description: Deletes a specific author.
 * Method: DELETE
 * Route: /authors/:author_id/delete
 * Authorization: Requires user to be logged in and authorized (either the user themselves or an admin).
 * Response: Returns a message confirming the deletion and the deleted user's username.
 * Throws: NotFoundErrorAPI if the specified user_id does not exist.
 */
const deleteAuthorAPI = require("./deleteAuthorAPI");
authorsRouter.delete("/:author_id/delete", requireUser, deleteAuthorAPI);

module.exports = authorsRouter;
