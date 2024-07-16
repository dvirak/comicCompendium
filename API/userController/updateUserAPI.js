// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const router = express.Router();
// ! -----------------------------------------------------------

// ! ---------------- IMPORTED MODULES -------------------------
const {
  getUserByIdDB,
} = require("../../DB/DBFunctions/UserDB/GetUsersDB/Helpers");
const updateUserDB = require("../../DB/DBFunctions/UserDB/updateUserDB");
const {
  logErrorAPI,
  UserNotFoundErrorAPI,
  NotAuthorizedErrorAPI,
} = require("../../Errors/API");
const createUserUpdateFieldsAPI = require("./Helpers/createUserUpdateFieldsAPI");
// ! -----------------------------------------------------------

/**
 * Description: Update user information based on user_id and request body data.
 * Method: PUT
 * Route: /users/:user_id
 *
 * @param {Object} req - Express request object containing user_id in params and update data in body.
 * @param {Object} res - Express response object to send success message and updated user data.
 * @param {Function} next - Express next function to pass control to the next middleware.
 * @returns {Promise<void>} This route does not return anything directly, but it sends a response with a success message and updated user data.
 * @throws {UserNotFoundErrorAPI} If the user with specified user_id is not found in the database.
 * @throws {NotAuthorizedErrorAPI} If the current user is not authorized to update the user information (either not matching user_id or not an admin).
 * @throws {Error} If an error occurs while updating user information in the database.
 *
 * @precondition The user must be authenticated and authorized to update user information.
 * @postcondition User information is updated in the database and a success message with updated user data is sent to the client.
 */

async function updateUserAPI(req, res, next) {
  const user_id = Number(req.params.user_id);
  const updateData = req.body;
  const currentUser = req.user;

  try {
    // Retrieve user information to edit from the database
    const userToEdit = await getUserByIdDB(user_id);

    // Check if user exists
    if (!userToEdit) {
      throw new UserNotFoundErrorAPI();
    } else if (user_id !== currentUser.id && !currentUser.admin) {
      // Check if current user is authorized to update user information
      throw new NotAuthorizedErrorAPI();
    } else {
      // Create update fields based on current user and update data
      const updateFields = await createUserUpdateFieldsAPI(
        currentUser,
        userToEdit,
        updateData
      );

      // Update user information in the database
      const updatedUser = await updateUserDB(user_id, updateFields);

      // Send success message and updated user data as response
      res.send({ message: "Update successful!", updatedUser });
    }
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("updateUserAPI", error, next);
  }
}

module.exports = updateUserAPI;
