// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const requireUser = require("../Authentication/requireUser");
const { getItemAPI, getAllAPI } = require("../MainFunctionsAPI");
// ! -----------------------------------------------------------

const authorsRouter = express.Router();
const table_name = "author";

/**
 * Description: Retrieves all authors.
 * Method: GET
 * Route: /authors
 */
// const getAllAuthorsAPI = require("./getAllAuthorsAPI");
// authorsRouter.get("/", getAllAuthorsAPI);
authorsRouter.get("/", (req, res, next) => {
  getAllAPI(req, res, next, table_name);
});

/**
 * Description: Retrieves an author based on author_id as a param or author_name as a query.
 * Method: GET
 * Route: /author/:author_id?
 *
 */
authorsRouter.get("/author/:id?", (req, res, next) => {
  getItemAPI(req, res, next, table_name);
});

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
 * Description: Updates author information based on author_id and request body data.
 * Method: PATCH
 * Route: /authors/:author_id/update
 * Middleware: requireUser - Ensures user is authenticated.
 * Request Body: Contains fields to update author information.
 * Response: Returns a message indicating update success and the updated author object.
 * Throws: AuthorNotFoundErrorAPI if the specified author_id does not exist.
 *         Error if an error occurs while updating author information in the database.
 */
const updateAuthorAPI = require("./updateAuthorAPI");
authorsRouter.patch("/:author_id/update", requireUser, updateAuthorAPI);

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
