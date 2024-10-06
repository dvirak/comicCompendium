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

const pencillersRouter = express.Router();
const table_name = "penciller"; // Table name for pencillers

/**
 * Description: Retrieves all pencillers from the database.
 * Method: GET
 * Route: /pencillers
 * Response: Returns an array of all pencillers.
 */
pencillersRouter.get("/", (req, res, next) => {
  getAllAPI(req, res, next, table_name);
});

/**
 * Description: Retrieves a specific penciller based on penciller_id parameter or penciller_name query.
 * Method: GET
 * Route: /pencillers/penciller/:id?
 * Request Params: Optional `id` to specify the penciller by ID.
 * Request Query: `name` to specify the penciller by name.
 * Response: Returns the details of the specified penciller.
 */
pencillersRouter.get("/penciller/:id?", (req, res, next) => {
  getItemAPI(req, res, next, table_name);
});

/**
 * Description: Creates a new penciller in the database.
 * Method: POST
 * Route: /pencillers/penciller/add
 * Request Body: Must contain `name` (string) for the penciller's name.
 * Response: Returns the created penciller's information.
 * Middleware: requireUser - Ensures the user is authenticated.
 */
pencillersRouter.post("/add", requireUser, (req, res, next) => {
  createItemAPI(req, res, next, table_name);
});

/**
 * Description: Updates an existing penciller's information.
 * Method: PATCH
 * Route: /pencillers/penciller/:id/update
 * Request Params: `id` specifies the penciller to update by ID.
 * Request Body: Contains fields to update the penciller's information.
 * Response: Returns a message indicating update success and the updated penciller object.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified penciller_id does not exist.
 *         Error if an error occurs while updating penciller information in the database.
 */
pencillersRouter.patch(
  "/penciller/:id/update",
  requireUser,
  (req, res, next) => {
    updateItemAPI(req, res, next, table_name);
  }
);

/**
 * Description: Deletes a specific penciller from the database.
 * Method: DELETE
 * Route: /pencillers/penciller/:id/delete
 * Request Params: `id` specifies the penciller to delete by ID.
 * Response: Returns a message confirming the deletion and the deleted penciller's name.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified penciller_id does not exist.
 */
pencillersRouter.delete(
  "/penciller/:id/delete",
  requireUser,
  (req, res, next) => {
    deleteItemAPI(req, res, next, table_name);
  }
);

module.exports = pencillersRouter;
