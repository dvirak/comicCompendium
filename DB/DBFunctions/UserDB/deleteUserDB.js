// ! ----------------- IMPORTED FILES --------------------------
const { logErrorDB } = require("../../../Errors/DB");
const client = require("../../client");
// ! -----------------------------------------------------------

/**
 * Description: Deletes a user from the database.
 *
 * @param {number} user_id - The ID of the user to be deleted.
 * @returns {Object} An object containing the status of the operation, a message, and the deleted user's username.
 * @throws {Error} If an error occurs while deleting the user.
 *
 * @precondition The user_id must be a valid existing user ID in the database.
 * @postcondition The user with the specified ID is deleted from the database.
 */
async function deleteUserDB(user_id) {
  try {
    // Perform the database query to delete the user
    const {
      rows: [user],
    } = await client.query(
      `
      DELETE FROM users
      WHERE id = $1
      RETURNING username;
    `,
      [user_id]
    );

    // Return success status and the deleted user's username
    return {
      status: true,
      name: "UserDeleted",
      message: "Deletion Success!",
      user,
    };
  } catch (error) {
    // Log any errors that occur and throw them for the caller to handle
    logErrorDB("deleteUserDB", error);
    throw error;
  }
}

module.exports = deleteUserDB;
