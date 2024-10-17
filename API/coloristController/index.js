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

const coloristsRouter = express.Router();
const table_name = "colorist"; // Table name for colorists

/**
 * Description: Retrieves all colorists from the database.
 * Method: GET
 * Route: /colorists
 * Response: Returns an array of all colorists.
 */
coloristsRouter.get("/", (req, res, next) => {
  getAllAPI(req, res, next, table_name);
});

/**
 * Description: Retrieves a specific colorist based on item_id parameter or item_name query.
 * Method: GET
 * Route: /colorists/colorist/:item_id?
 * Request Params: Optional `item_id` to specify the colorist by ID.
 * Request Query: item_name to specify the colorist by name.
 * Response: Returns the details of the specified colorist.
 */
coloristsRouter.get("/colorist/:item_id?", (req, res, next) => {
  getItemAPI(req, res, next, table_name);
});

/**
 * Description: Creates a new colorist in the database.
 * Method: POST
 * Route: /colorists/colorist/add
 * Request Body: Must contain item_name (string) for the colorist's name.
 * Response: Returns the created colorist's information.
 * Middleware: requireUser - Ensures the user is authenticated.
 */
coloristsRouter.post("/add", requireUser, (req, res, next) => {
  createItemAPI(req, res, next, table_name);
});

/**
 * Description: Updates an existing colorist's information.
 * Method: PATCH
 * Route: /colorists/colorist/:item_id/update
 * Request Params: `item_id` specifies the colorist to update by ID.
 * Request Body: Contains fields to update the colorist's information.
 * Response: Returns a message indicating update success and the updated colorist object.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified colorist_id does not exist.
 *         Error if an error occurs while updating colorist information in the database.
 */
coloristsRouter.patch(
  "/colorist/:item_id/update",
  requireUser,
  (req, res, next) => {
    updateItemAPI(req, res, next, table_name);
  }
);

/**
 * Description: Deletes a specific colorist from the database.
 * Method: DELETE
 * Route: /colorists/colorist/:item_id/delete
 * Request Params: `item_id` specifies the colorist to delete by ID.
 * Response: Returns a message confirming the deletion and the deleted colorist's name.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified colorist_id does not exist.
 */
coloristsRouter.delete(
  "/colorist/:item_id/delete",
  requireUser,
  (req, res, next) => {
    deleteItemAPI(req, res, next, table_name);
  }
);

module.exports = coloristsRouter;
