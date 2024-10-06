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

const letterersRouter = express.Router();
const table_name = "letterer"; // Table name for letterers

/**
 * Description: Retrieves all letterers from the database.
 * Method: GET
 * Route: /letterers
 * Response: Returns an array of all letterers.
 */
letterersRouter.get("/", (req, res, next) => {
  getAllAPI(req, res, next, table_name);
});

/**
 * Description: Retrieves a specific letterer based on letterer_id parameter or letterer_name query.
 * Method: GET
 * Route: /letterers/letterer/:id?
 * Request Params: Optional `id` to specify the letterer by ID.
 * Request Query: `name` to specify the letterer by name.
 * Response: Returns the details of the specified letterer.
 */
letterersRouter.get("/letterer/:id?", (req, res, next) => {
  getItemAPI(req, res, next, table_name);
});

/**
 * Description: Creates a new letterer in the database.
 * Method: POST
 * Route: /letterers/letterer/add
 * Request Body: Must contain `name` (string) for the letterer's name.
 * Response: Returns the created letterer's information.
 * Middleware: requireUser - Ensures the user is authenticated.
 */
letterersRouter.post("/add", requireUser, (req, res, next) => {
  createItemAPI(req, res, next, table_name);
});

/**
 * Description: Updates an existing letterer's information.
 * Method: PATCH
 * Route: /letterers/letterer/:id/update
 * Request Params: `id` specifies the letterer to update by ID.
 * Request Body: Contains fields to update the letterer's information.
 * Response: Returns a message indicating update success and the updated letterer object.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified letterer_id does not exist.
 *         Error if an error occurs while updating letterer information in the database.
 */
letterersRouter.patch("/letterer/:id/update", requireUser, (req, res, next) => {
  updateItemAPI(req, res, next, table_name);
});

/**
 * Description: Deletes a specific letterer from the database.
 * Method: DELETE
 * Route: /letterers/letterer/:id/delete
 * Request Params: `id` specifies the letterer to delete by ID.
 * Response: Returns a message confirming the deletion and the deleted letterer's name.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified letterer_id does not exist.
 */
letterersRouter.delete(
  "/letterer/:id/delete",
  requireUser,
  (req, res, next) => {
    deleteItemAPI(req, res, next, table_name);
  }
);

module.exports = letterersRouter;
