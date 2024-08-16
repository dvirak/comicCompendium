// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const requireUser = require("../Authentication/requireUser");
const {
  getItemAPI,
  getAllAPI,
  createItemAPI,
  deleteItemAPI,
} = require("../MainFunctionsAPI");
// ! -----------------------------------------------------------

const illustratorsRouter = express.Router();
const table_name = "illustrator";

/**
 * Description: Retrieves all authors.
 * Method: GET
 * Route: /authors
 */
illustratorsRouter.get("/", (req, res, next) => {
  getAllAPI(req, res, next, table_name);
});

/**
 * Description: Retrieves an author based on author_id as a param or author_name as a query.
 * Method: GET
 * Route: /author/:author_id?
 *
 */
illustratorsRouter.get("/illustrator/:id?", (req, res, next) => {
  getItemAPI(req, res, next, table_name);
});

/**
 * Description: creates a new author.
 * Method: POST
 * Route: /author/add
 * Request Body: Requires author_name (string).
 * Response: Returns an array containing author info and a message.
 */
illustratorsRouter.post("/add", (req, res, next) => {
  createItemAPI(req, res, next, table_name);
});

/**
 * Description: Deletes a specific author.
 * Method: DELETE
 * Route: /authors/:author_id/delete
 * Authorization: Requires user to be logged in and authorized (either the user themselves or an admin).
 * Response: Returns a message confirming the deletion and the deleted user's username.
 * Throws: NotFoundErrorAPI if the specified user_id does not exist.
 */
illustratorsRouter.delete("/:id/delete", requireUser, (req, res, next) => {
  deleteItemAPI(req, res, next, table_name);
});

module.exports = illustratorsRouter;
