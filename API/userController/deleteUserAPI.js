// ! ----------------- IMPORTED FILES --------------------------
const { confirmUserDB, deleteUserDB } = require("../../DB/DBFunctions/UserDB");
const {
  getUserByIdDB,
} = require("../../DB/DBFunctions/UserDB/GetUsersDB/Helpers");
const {
  logErrorAPI,
  UserNotFoundErrorAPI,
  NotAuthorizedErrorAPI,
  InputErrorUsersAPI,
} = require("../../Errors/API");
// ! -----------------------------------------------------------

/**
 * Description: Deletes a user.
 * Method: DELETE
 * Route: /users/:user_id
 * Middleware: requireUser - Ensures user is authenticated.
 * Request Body: Requires password for confirmation.
 * Response: Returns a message indicating the user was deleted.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @throws {Error} If an error occurs while deleting the user.
 *
 * @precondition The user must be authenticated and provide their password.
 * @postcondition The specified user is deleted if the current user is authorized and the password is correct.
 */
async function deleteUserAPI(req, res, next) {
  // Convert user_id from params to a number
  let user_to_delete_id = Number(req.params.user_id);
  const { password } = req.body;

  try {
    // Fetch the user to be deleted and the current user from the database
    const userToDelete = await getUserByIdDB(user_to_delete_id);
    const currentUser = await getUserByIdDB(req.user.id);

    // Check if the user to delete exists
    if (!userToDelete) {
      throw new UserNotFoundErrorAPI();
    }

    // Check if the current user is authorized to delete the user
    if (user_to_delete_id !== req.user.id && !req.user.admin) {
      throw new NotAuthorizedErrorAPI();
    }

    // Confirm the user's password
    const confirmUser = await confirmUserDB(currentUser.username, password);
    if (!confirmUser) {
      throw new InputErrorUsersAPI("Incorrect Password");
    }

    // Delete the user from the database
    const response = await deleteUserDB(user_to_delete_id);

    // Send the response indicating the user was deleted
    res.send({ response });
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("deleteUserAPI", error, next);
  }
}

module.exports = deleteUserAPI;
