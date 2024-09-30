// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const requireUser = require("../Authentication/requireUser");
const requireAdmin = require("../Authentication/requireAdmin");
// ! -----------------------------------------------------------

const usersRouter = express.Router();

/**
 * Description: Retrieves a list of all users.
 * Method: GET
 * Route: /users
 * Authorization: Requires admin privileges.
 * Response: Returns an array containing information for all users.
 * Throws: NotAuthorizedErrorAPI if the logged-in user is not an admin.
 */
const getAllUsersAPI = require("./getAllUsersAPI");
usersRouter.get("/", requireAdmin, getAllUsersAPI);

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
usersRouter.get("/user/:user_id?", requireUser, getSingleUserAPI);

/**
 * Description: Authenticates a user and returns a token.
 * Method: POST
 * Route: /users/login
 * Request Body: Requires username and password.
 * Response: Returns an array containing user info, a message, and a token.
 */
const loginUserAPI = require("./loginUserAPI");
usersRouter.post("/login", loginUserAPI);

/**
 * Description: Registers a new user and returns a token.
 * Method: POST
 * Route: /users/register
 * Request Body: Requires username (string), password (string), first_name (string), last_name (string), preferred_name (string), phone (int), email (string). Optionally contains admin (boolean).
 * Response: Returns an array containing user info, a message, and a token.
 */
const createUserAPI = require("./createUserAPI");
usersRouter.post("/register", createUserAPI);

/**
 * Description: Updates information for a specific user.
 * Method: PATCH
 * Route: /users/:user_id/update
 * Request Body: Contains fields to update for the user identified by user_id.
 * Authorization: Requires user to be logged in and authorized (either the user themselves or an admin).
 * Response: Returns a message confirming the update and the updated user object.
 * Throws: UserNotFoundErrorAPI if the specified user_id does not exist.
 *         NotAuthorizedErrorAPI if the logged-in user is not authorized to perform the update.
 *         NotAdminErrorAPI if the update request includes 'admin' field and the logged-in user is not an admin.
 *         CantEditErrorAPI if the update request includes 'id' or 'password' fields, which cannot be edited.
 *         MissingInformationErrorAPI if any required update information is missing in the request body.
 */
const updateUserAPI = require("./updateUserAPI");
usersRouter.patch("/:user_id/update", requireUser, updateUserAPI);

/**
 * Description: Deletes a specific user.
 * Method: DELETE
 * Route: /users/:user_id/delete
 * Request Body: Requires the current user's password for confirmation.
 * Authorization: Requires user to be logged in and authorized (either the user themselves or an admin).
 * Response: Returns a message confirming the deletion and the deleted user's username.
 * Throws: UserNotFoundErrorAPI if the specified user_id does not exist.
 *         NotAuthorizedErrorAPI if the logged-in user is not authorized to delete the user.
 *         InputErrorAPI if the provided password is incorrect.
 */
const deleteUserAPI = require("./deleteUserAPI");
usersRouter.delete("/:user_id/delete", requireUser, deleteUserAPI);

module.exports = usersRouter;
