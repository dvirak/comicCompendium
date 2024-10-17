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

const seriesRouter = express.Router();
const table_name = "series"; // Table name for series

/**
 * Description: Retrieves all series from the database.
 * Method: GET
 * Route: /series
 * Response: Returns an array of all series.
 */
seriesRouter.get("/", (req, res, next) => {
  getAllAPI(req, res, next, table_name);
});

/**
 * Description: Retrieves a specific series based on item_id parameter or item_name query.
 * Method: GET
 * Route: /series/series/:item_id?
 * Request Params: `item_id` to specify the series by ID.
 * Request Query: item_name to specify the series by name.
 * Response: Returns the details of the specified series.
 */
seriesRouter.get("/series/:item_id?", (req, res, next) => {
  getItemAPI(req, res, next, table_name);
});

/**
 * Description: Creates a new series in the database.
 * Method: POST
 * Route: /series/series/add
 * Request Body: Must contain item_name (string) for the series's name.
 * Response: Returns the created series's information.
 * Middleware: requireUser - Ensures the user is authenticated.
 */
seriesRouter.post("/add", requireUser, (req, res, next) => {
  createItemAPI(req, res, next, table_name);
});

/**
 * Description: Updates an existing series's information.
 * Method: PATCH
 * Route: /series/series/:item_id/update
 * Request Params: `item_id` specifies the series to update by ID.
 * Request Body: Contains fields to update the series's information.
 * Response: Returns a message indicating update success and the updated series object.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified series_id does not exist.
 *         Error if an error occurs while updating series information in the database.
 */
seriesRouter.patch("/series/:item_id/update", requireUser, (req, res, next) => {
  updateItemAPI(req, res, next, table_name);
});

/**
 * Description: Deletes a specific series from the database.
 * Method: DELETE
 * Route: /series/series/:item_id/delete
 * Request Params: `item_id` specifies the series to delete by ID.
 * Response: Returns a message confirming the deletion and the deleted series's name.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified series_id does not exist.
 */
seriesRouter.delete(
  "/series/:item_id/delete",
  requireUser,
  (req, res, next) => {
    deleteItemAPI(req, res, next, table_name);
  }
);

module.exports = seriesRouter;
