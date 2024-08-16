// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const requireUser = require("../Authentication/requireUser");
const { getItemAPI, getAllAPI, createItemAPI } = require("../MainFunctionsAPI");
// ! -----------------------------------------------------------

const illustratorsRouter = express.Router();
const table_name = "illustrator";

/**
 * Description: Retrieves all authors.
 * Method: GET
 * Route: /authors
 */
illustratorsRouter.get("/", (req, res, next) => {
  getAllAPI(req, res, next, table_name);
});

/**
 * Description: Retrieves an author based on author_id as a param or author_name as a query.
 * Method: GET
 * Route: /author/:author_id?
 *
 */
illustratorsRouter.get("/illustrator/:id?", (req, res, next) => {
  getItemAPI(req, res, next, table_name);
});

/**
 * Description: creates a new author.
 * Method: POST
 * Route: /author/add
 * Request Body: Requires author_name (string).
 * Response: Returns an array containing author info and a message.
 */
illustratorsRouter.post("/add", (req, res, next) => {
  createItemAPI(req, res, next, table_name);
});

module.exports = illustratorsRouter;
