// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const requireUser = require("../Authentication/requireUser");
const { getItemAPI, getAllAPI } = require("../MainFunctionsAPI");
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

module.exports = illustratorsRouter;
