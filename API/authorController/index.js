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

const authorsRouter = express.Router();
const table_name = "author"; // Table name for authors

/**
 * Description: Retrieves all authors from the database.
 * Method: GET
 * Route: /authors/
 * Response: Returns an array of all authors.
 */
authorsRouter.get("/", (req, res, next) => {
  getAllAPI(req, res, next, table_name);
});

/**
 * Description: Retrieves a specific author based on the item_id parameter or item_name query.
 * Method: GET
 * Route: /authors/author/:item_id?
 * Request Params: Optional `item_id` to specify the author by ID.
 * Request Query: item_name to specify the author by name.
 * Response: Returns the details of the specified author.
 */
authorsRouter.get("/author/:item_id?", (req, res, next) => {
  getItemAPI(req, res, next, table_name);
});

/**
 * Description: Creates a new author in the database.
 * Method: POST
 * Route: /authors/author/add
 * Request Body: Must contain item_name (string) for the author's name.
 * Response: Returns the created author's information.
 * Middleware: requireUser - Ensures the user is authenticated.
 */
authorsRouter.post("/add", requireUser, (req, res, next) => {
  createItemAPI(req, res, next, table_name);
});

/**
 * Description: Updates an existing author's information.
 * Method: PATCH
 * Route: /authors/author/:item_id/update
 * Request Params: `item_id` specifies the author to update by ID.
 * Request Body: Contains fields to update the author's information.
 * Response: Returns a message indicating update success and the updated author object.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: AuthorNotFoundErrorAPI if the specified author_id does not exist.
 */
authorsRouter.patch(
  "/author/:item_id/update",
  requireUser,
  (req, res, next) => {
    updateItemAPI(req, res, next, table_name);
  }
);

/**
 * Description: Deletes a specific author from the database.
 * Method: DELETE
 * Route: /authors/author/:item_id/delete
 * Request Params: `item_id` specifies the author to delete by ID.
 * Response: Returns a message confirming the deletion and the deleted author's name.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified author_id does not exist.
 */
authorsRouter.delete(
  "/author/:item_id/delete",
  requireUser,
  (req, res, next) => {
    deleteItemAPI(req, res, next, table_name);
  }
);

module.exports = authorsRouter;
