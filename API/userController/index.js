// ! ----------------- IMPORTED LIBRARIES --------------------------
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

/**
 * Description: Retrieves information for a single user.
 * Method: GET
 * Route: /users/user
 * Request Body: Requires either the user_id OR the username.
 * Response:
 *  - If username is provided: Returns an array with all info for the user.
 *  - If user_id is provided: Returns an array with all info minus the password and admin info.
 */
const getSingleUserAPI = require("./getSingleUserAPI");
usersRouter.get("/user", getSingleUserAPI);

/**
 * Description: Authenticates a user and returns a token.
 * Method: POST
 * Route: /users/login
 * Request Body: Requires username and password.
 * Response: Returns an array containing user info, a message, and a token.
 */
const loginUserAPI = require("./loginUserAPI");
usersRouter.post("/login", loginUserAPI);

const createUserAPI = require("./createUserAPI");
usersRouter.post("/register", createUserAPI);

module.exports = usersRouter;
