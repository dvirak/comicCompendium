// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const requireUser = require("../Authentication/requireUser");
const {
  getItemAPI,
  getAllAPI,
  createItemAPI,
  deleteItemAPI,
  updateItemAPI,
} = require("../MainFunctionsAPI");
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
 * Route: /illustrator/:illustrator_id?
 *
 */
illustratorsRouter.get("/illustrator/:id?", (req, res, next) => {
  getItemAPI(req, res, next, table_name);
});

/**
 * Description: creates a new illustrator.
 * Method: POST
 * Route: /illustrator/add
 * Request Body: Requires illustrator_name (string).
 * Response: Returns an array containing illustrator info and a message.
 */
illustratorsRouter.post("/add", (req, res, next) => {
  createItemAPI(req, res, next, table_name);
});

/**
 * Description: Updates illustrator information based on illustrator_id and request body data.
 * Method: PATCH
 * Route: /illustrators/:id/update
 * Middleware: requireUser - Ensures user is authenticated.
 * Request Body: Contains fields to update illustrator information.
 * Response: Returns a message indicating update success and the updated illustrator object.
 * Throws: IllustratorNotFoundErrorAPI if the specified illustrator_id does not exist.
 *         Error if an error occurs while updating illustrator information in the database.
 */
illustratorsRouter.patch("/:id/update", requireUser, (req, res, next) => {
  updateItemAPI(req, res, next, table_name);
});

/**
 * Description: Deletes a specific illustrator.
 * Method: DELETE
 * Route: /illustrators/:illustrator_id/delete
 * Illustratorization: Requires user to be logged in and illustratorized (either the user themselves or an admin).
 * Response: Returns a message confirming the deletion and the deleted user's username.
 * Throws: NotFoundErrorAPI if the specified user_id does not exist.
 */
illustratorsRouter.delete("/:id/delete", requireUser, (req, res, next) => {
  deleteItemAPI(req, res, next, table_name);
});

module.exports = illustratorsRouter;
