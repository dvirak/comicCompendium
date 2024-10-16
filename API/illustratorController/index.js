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
const { getRelationItemsAPI } = require("../RelationshipFunctionsAPI"); // Function for retrieving related items
// ! -----------------------------------------------------------

const illustratorsRouter = express.Router();
const table_name = "illustrator"; // Table name for illustrators

/**
 * Description: Retrieves all illustrators from the database.
 * Method: GET
 * Route: /illustrators
 * Response: Returns an array of all illustrators.
 */
illustratorsRouter.get("/", (req, res, next) => {
  getAllAPI(req, res, next, table_name);
});

/**
 * Description: Retrieves a specific illustrator based on illustrator_id parameter or illustrator_name query.
 * Method: GET
 * Route: /illustrators/illustrator/:id?
 * Request Params: Optional `id` to specify the illustrator by ID.
 * Request Query: `item_name` to specify the illustrator by name.
 * Response: Returns the details of the specified illustrator.
 */
illustratorsRouter.get("/illustrator/:id?", (req, res, next) => {
  getItemAPI(req, res, next, table_name);
});

/**
 * Description: Creates a new illustrator in the database.
 * Method: POST
 * Route: /illustrators/illustrator/add
 * Request Body: Must contain `item_name` (string) for the illustrator's name.
 * Response: Returns an object containing the created illustrator's information.
 * Middleware: requireUser - Ensures the user is authenticated.
 */
illustratorsRouter.post("/add", requireUser, (req, res, next) => {
  createItemAPI(req, res, next, table_name);
});

/**
 * Description: Updates an existing illustrator's information based on illustrator_id and request body data.
 * Method: PATCH
 * Route: /illustrators/illustrator/:id/update
 * Request Params: `id` specifies the illustrator to update by ID.
 * Request Body: Contains fields to update the illustrator's information.
 * Response: Returns a message indicating update success and the updated illustrator object.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: IllustratorNotFoundErrorAPI if the specified illustrator_id does not exist.
 *         Error if an error occurs while updating illustrator information in the database.
 */
illustratorsRouter.patch(
  "/illustrator/:id/update",
  requireUser,
  (req, res, next) => {
    updateItemAPI(req, res, next, table_name);
  }
);

/**
 * Description: Deletes a specific illustrator from the database.
 * Method: DELETE
 * Route: /illustrators/illustrator/:id/delete
 * Request Params: `id` specifies the illustrator to delete by ID.
 * Response: Returns a message confirming the deletion and the deleted illustrator's name.
 * Middleware: requireUser - Ensures the user is authenticated.
 * Throws: NotFoundErrorAPI if the specified illustrator_id does not exist.
 */
illustratorsRouter.delete(
  "/illustrator/:id/delete",
  requireUser,
  (req, res, next) => {
    deleteItemAPI(req, res, next, table_name);
  }
);

/**
 * Description: Retrieves related items for a specific illustrator.
 * Method: GET
 * Route: /illustrators/illustrator/:id/relation
 * Request Params: `id` specifies the illustrator to retrieve relations for.
 * Response: Returns related items for the specified illustrator.
 */
illustratorsRouter.get("/illustrator/:id/relation/?", (req, res, next) => {
  getRelationItemsAPI(req, res, next, table_name);
});

module.exports = illustratorsRouter; // Export the illustrators router for use in other modules
