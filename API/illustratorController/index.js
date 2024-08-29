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
const { getRelationItemsAPI } = require("../RelationshipFunctionsAPI");

// ! -----------------------------------------------------------

const illustratorsRouter = express.Router();
const table_name = "illustrator";

/**
 * Description: Retrieves all illustrators.
 * Method: GET
 * Route: /illustrators
 */
illustratorsRouter.get("/", (req, res, next) => {
  getAllAPI(req, res, next, table_name);
});

/**
 * Description: Retrieves an illustrator based on illustrator_id as a param or illustrator_name as a query.
 * Method: GET
 * Route: /illustrators/illustrator/:id?
 */
illustratorsRouter.get("/illustrator/:id?", (req, res, next) => {
  getItemAPI(req, res, next, table_name);
});

/**
 * Description: Creates a new illustrator.
 * Method: POST
 * Route: /illustrators/illustrator/add
 * Request Body: Requires `name` (string) for the illustrator's name.
 * Response: Returns an object containing illustrator info and a success message.
 */
illustratorsRouter.post("/add", (req, res, next) => {
  createItemAPI(req, res, next, table_name);
});

/**
 * Description: Updates illustrator information based on illustrator_id and request body data.
 * Method: PATCH
 * Route: /illustrators/illustrator/:id/update
 * Middleware: requireUser - Ensures user is authenticated.
 * Request Body: Contains fields to update illustrator information.
 * Response: Returns a message indicating update success and the updated illustrator object.
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
 * Description: Deletes a specific illustrator.
 * Method: DELETE
 * Route: /illustrators/illustrator/:id/delete
 * Middleware: requireUser - Ensures user is authenticated.
 * Response: Returns a message confirming the deletion and the deleted illustrator's name.
 * Throws: NotFoundErrorAPI if the specified illustrator_id does not exist.
 */
illustratorsRouter.delete(
  "/illustrator/:id/delete",
  requireUser,
  (req, res, next) => {
    deleteItemAPI(req, res, next, table_name);
  }
);

illustratorsRouter.get(
  "/illustrator/:id/relation/?",
  requireUser,
  (req, res, next) => {
    getRelationItemsAPI(req, res, next, table_name);
  }
);

module.exports = illustratorsRouter;
