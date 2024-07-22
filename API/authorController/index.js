// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const requireUser = require("../Authentication/requireUser");
// ! -----------------------------------------------------------

const authorsRouter = express.Router();

/**
 * Description: Retrieves all authors.
 * Method: GET
 * Route: /authors
 */
const getAllAuthorsAPI = require("./getAllAuthorsAPI");
authorsRouter.get("/", getAllAuthorsAPI);

module.exports = authorsRouter;
