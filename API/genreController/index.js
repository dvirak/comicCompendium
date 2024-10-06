// ! ----------------- IMPORTED FILES --------------------------
const express = require("express"); // Express framework
const requireUser = require("../Authentication/requireUser"); // Middleware to ensure user is authenticated
const {
  getItemAPI,
  getAllAPI,
  createItemAPI,
  deleteItemAPI,
  updateItemAPI,
} = require("../MainFunctionsAPI"); // Generic functions for handling database operations
// ! -----------------------------------------------------------

const genresRouter = express.Router();
const table_name = "genre"; // Table name for genres

/**
 * Description: Retrieves all genres from the database.
 * Method: GET
 * Route: /genres
 * Response: Returns an array of all genres.
 */
genresRouter.get("/", (req, res, next) => {
  getAllAPI(req, res, next, table_name);
});

/**
 * Description: Retrieves a specific genre based on genre_id parameter or genre_name query.
 * Method: GET
 * Route: /genres/genre/:id?
 * Request Params: Optional `id` to specify the genre by ID.
 * Request Query: `name` to specify the genre by name.
 * Response: Returns the details of the specified genre.
 */
genresRouter.get("/genre/:id?", (req, res, next) => {
  getItemAPI(req, res, next, table_name);
});

/**
 * Description: Creates a new genre in the database.
 * Method: POST
 * Route: /genres/genre/add
 * Request Body: Must contain `name` (string) for the genre's name.
 * Response: Returns the created genre's information.
 * Middleware: requireUser - Ensures the user is authenticated.
 */
genresRouter.post("/add", requireUser, (req, res, next) => {
  createItemAPI(req, res, next, table_name);
});

/**
 * Description: Updates an existing genre's information.
 * Method: PATCH
 * Route: /genres/genre/:id/update
 * Request Params: `id` specifies the genre to update by ID.
 * Request Body: Contains fields to update the genre's information.
 * Response: Returns a message indicating update success and the updated genre object.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified genre_id does not exist.
 *         Error if an error occurs while updating genre information in the database.
 */
genresRouter.patch("/genre/:id/update", requireUser, (req, res, next) => {
  updateItemAPI(req, res, next, table_name);
});

/**
 * Description: Deletes a specific genre from the database.
 * Method: DELETE
 * Route: /genres/genre/:id/delete
 * Request Params: `id` specifies the genre to delete by ID.
 * Response: Returns a message confirming the deletion and the deleted genre's name.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified genre_id does not exist.
 */
genresRouter.delete("/genre/:id/delete", requireUser, (req, res, next) => {
  deleteItemAPI(req, res, next, table_name);
});

module.exports = genresRouter;
