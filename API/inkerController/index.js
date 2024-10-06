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

const inkersRouter = express.Router();
const table_name = "inker"; // Table name for inkers

/**
 * Description: Retrieves all inkers from the database.
 * Method: GET
 * Route: /inkers
 * Response: Returns an array of all inkers.
 */
inkersRouter.get("/", (req, res, next) => {
  getAllAPI(req, res, next, table_name);
});

/**
 * Description: Retrieves a specific inker based on inker_id parameter or inker_name query.
 * Method: GET
 * Route: /inkers/inker/:id?
 * Request Params: Optional `id` to specify the inker by ID.
 * Request Query: `name` to specify the inker by name.
 * Response: Returns the details of the specified inker.
 */
inkersRouter.get("/inker/:id?", (req, res, next) => {
  getItemAPI(req, res, next, table_name);
});

/**
 * Description: Creates a new inker in the database.
 * Method: POST
 * Route: /inkers/inker/add
 * Request Body: Must contain `name` (string) for the inker's name.
 * Response: Returns the created inker's information.
 * Middleware: requireUser - Ensures the user is authenticated.
 */
inkersRouter.post("/add", requireUser, (req, res, next) => {
  createItemAPI(req, res, next, table_name);
});

/**
 * Description: Updates an existing inker's information.
 * Method: PATCH
 * Route: /inkers/inker/:id/update
 * Request Params: `id` specifies the inker to update by ID.
 * Request Body: Contains fields to update the inker's information.
 * Response: Returns a message indicating update success and the updated inker object.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified inker_id does not exist.
 *         Error if an error occurs while updating inker information in the database.
 */
inkersRouter.patch("/inker/:id/update", requireUser, (req, res, next) => {
  updateItemAPI(req, res, next, table_name);
});

/**
 * Description: Deletes a specific inker from the database.
 * Method: DELETE
 * Route: /inkers/inker/:id/delete
 * Request Params: `id` specifies the inker to delete by ID.
 * Response: Returns a message confirming the deletion and the deleted inker's name.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified inker_id does not exist.
 */
inkersRouter.delete("/inker/:id/delete", requireUser, (req, res, next) => {
  deleteItemAPI(req, res, next, table_name);
});

module.exports = inkersRouter;
