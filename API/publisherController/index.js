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

const publishersRouter = express.Router();
const table_name = "publisher"; // Table name for publishers

/**
 * Description: Retrieves all publishers from the database.
 * Method: GET
 * Route: /publishers
 * Response: Returns an array of all publishers.
 */
publishersRouter.get("/", (req, res, next) => {
  getAllAPI(req, res, next, table_name);
});

/**
 * Description: Retrieves a specific publisher based on publisher_id parameter or publisher_name query.
 * Method: GET
 * Route: /publishers/publisher/:id?
 * Request Params: Optional `id` to specify the publisher by ID.
 * Request Query: item_name to specify the publisher by name.
 * Response: Returns the details of the specified publisher.
 */
publishersRouter.get("/publisher/:id?", (req, res, next) => {
  getItemAPI(req, res, next, table_name);
});

/**
 * Description: Creates a new publisher in the database.
 * Method: POST
 * Route: /publishers/publisher/add
 * Request Body: Must contain item_name (string) for the publisher's name.
 * Response: Returns the created publisher's information.
 * Middleware: requireUser - Ensures the user is authenticated.
 */
publishersRouter.post("/add", requireUser, (req, res, next) => {
  createItemAPI(req, res, next, table_name);
});

/**
 * Description: Updates an existing publisher's information.
 * Method: PATCH
 * Route: /publishers/publisher/:id/update
 * Request Params: `id` specifies the publisher to update by ID.
 * Request Body: Contains fields to update the publisher's information.
 * Response: Returns a message indicating update success and the updated publisher object.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified publisher_id does not exist.
 *         Error if an error occurs while updating publisher information in the database.
 */
publishersRouter.patch(
  "/publisher/:id/update",
  requireUser,
  (req, res, next) => {
    updateItemAPI(req, res, next, table_name);
  }
);

/**
 * Description: Deletes a specific publisher from the database.
 * Method: DELETE
 * Route: /publishers/publisher/:id/delete
 * Request Params: `id` specifies the publisher to delete by ID.
 * Response: Returns a message confirming the deletion and the deleted publisher's name.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified publisher_id does not exist.
 */
publishersRouter.delete(
  "/publisher/:id/delete",
  requireUser,
  (req, res, next) => {
    deleteItemAPI(req, res, next, table_name);
  }
);

module.exports = publishersRouter;
