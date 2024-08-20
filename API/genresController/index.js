// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const requireUser = require("../Authentication/requireUser");
const {
  getItemAPI,
  getAllAPI,
  createItemAPI,
  deleteItemAPI,
  updateItemAPI,
} = require("../MainFunctionsAPI");
// ! -----------------------------------------------------------

const genresRouter = express.Router();
const table_name = "genre";

/**
 * Description: Retrieves all genres.
 * Method: GET
 * Route: /genres
 */
genresRouter.get("/", (req, res, next) => {
  getAllAPI(req, res, next, table_name);
});

/**
 * Description: Retrieves an genre based on genre_id as a param or genre_name as a query.
 * Method: GET
 * Route: /genre/:genre_id?
 *
 */
genresRouter.get("/genre/:id?", (req, res, next) => {
  getItemAPI(req, res, next, table_name);
});

/**
 * Description: creates a new genre.
 * Method: POST
 * Route: /genre/add
 * Request Body: Requires genre_name (string).
 * Response: Returns an array containing genre info and a message.
 */
genresRouter.post("/add", (req, res, next) => {
  createItemAPI(req, res, next, table_name);
});

/**
 * Description: Updates genre information based on genre_id and request body data.
 * Method: PATCH
 * Route: /genres/:id/update
 * Middleware: requireUser - Ensures user is authenticated.
 * Request Body: Contains fields to update genre information.
 * Response: Returns a message indicating update success and the updated genre object.
 * Throws: IllustratorNotFoundErrorAPI if the specified genre_id does not exist.
 *         Error if an error occurs while updating genre information in the database.
 */
genresRouter.patch("/genre/:id/update", requireUser, (req, res, next) => {
  updateItemAPI(req, res, next, table_name);
});

/**
 * Description: Deletes a specific genre.
 * Method: DELETE
 * Route: /genres/:genre_id/delete
 * Illustratorization: Requires user to be logged in and genreized (either the user themselves or an admin).
 * Response: Returns a message confirming the deletion and the deleted user's username.
 * Throws: NotFoundErrorAPI if the specified user_id does not exist.
 */
genresRouter.delete("/genre/:id/delete", requireUser, (req, res, next) => {
  deleteItemAPI(req, res, next, table_name);
});

module.exports = genresRouter;

module.exports = genresRouter;
