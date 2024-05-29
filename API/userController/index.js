// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
// ! -----------------------------------------------------------

const usersRouter = express.Router();

/**
 * Description: Retrieves a list of all users.
 * Method: GET
 * Route: /users
 */
const getAllUsersAPI = require("./getAllUsersAPI");
usersRouter.get("/", getAllUsersAPI);

module.exports = usersRouter;
