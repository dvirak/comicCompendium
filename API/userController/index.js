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

const getSingleUserAPI = require("./getSingleUserAPI");
usersRouter.get("/user", getSingleUserAPI);

const loginUserAPI = require("./loginUserAPI");
usersRouter.post("/login", loginUserAPI);

module.exports = usersRouter;
