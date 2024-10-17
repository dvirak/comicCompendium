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
 * Description: Retrieves a specific genre based on item_id parameter or item_name query.
 * Method: GET
 * Route: /genres/genre/:item_id?
 * Request Params: Optional `item_id` to specify the genre by ID.
 * Request Query: item_name to specify the genre by name.
 * Response: Returns the details of the specified genre.
 */
genresRouter.get("/genre/:item_id?", (req, res, next) => {
  getItemAPI(req, res, next, table_name);
});

/**
 * Description: Creates a new genre in the database.
 * Method: POST
 * Route: /genres/genre/add
 * Request Body: Must contain item_name (string) for the genre's name.
 * Response: Returns the created genre's information.
 * Middleware: requireUser - Ensures the user is authenticated.
 */
genresRouter.post("/add", requireUser, (req, res, next) => {
  createItemAPI(req, res, next, table_name);
});

/**
 * Description: Updates an existing genre's information.
 * Method: PATCH
 * Route: /genres/genre/:item_id/update
 * Request Params: `item_id` specifies the genre to update by ID.
 * Request Body: Contains fields to update the genre's information.
 * Response: Returns a message indicating update success and the updated genre object.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified genre_id does not exist.
 *         Error if an error occurs while updating genre information in the database.
 */
genresRouter.patch("/genre/:item_id/update", requireUser, (req, res, next) => {
  updateItemAPI(req, res, next, table_name);
});

/**
 * Description: Deletes a specific genre from the database.
 * Method: DELETE
 * Route: /genres/genre/:item_id/delete
 * Request Params: `item_id` specifies the genre to delete by ID.
 * Response: Returns a message confirming the deletion and the deleted genre's name.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified genre_id does not exist.
 */
genresRouter.delete("/genre/:item_id/delete", requireUser, (req, res, next) => {
  deleteItemAPI(req, res, next, table_name);
});

module.exports = genresRouter;
