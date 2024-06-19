// ! ----------------- IMPORTED FILES --------------------------
const { getUserByIdDB, getUserByUsernameDB } = require("./Helpers");
const { NoUserProvidedErrorDB, logErrorDB } = require("../../../../Errors/DB");
// ! -----------------------------------------------------------

// -----------------GET SINGLE USER FROM DATABASE---------------
/**
 * Retrieves a single user from the database based on the provided user_id or username.
 *
 * @param {Object} userData - Object containing user data.
 * @param {number} [userData.user_id] - The ID of the user to retrieve.
 * @param {string} [userData.username] - The name of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the user data.
 * @throws {Error} If neither user_id nor username is provided, or if the user is not found.
 *
 * @precondition userData is an object containing either a user_id or a username.
 * @postcondition The function returns a Promise that resolves to an object containing the user data from the database.
 *                If an error occurs, the function throws an error.
 */
async function getSingleUserDB(userData) {
  const { user_id, username } = userData;
  console.log("IN GET SINGLE USER DB");

  try {
    if (!user_id && !username) {
      throw new NoUserProvidedErrorDB(); // Throw an error if neither user_id nor username is provided
    }

    let user;

    if (user_id) {
      // Retrieve user by user_id if provided
      user = await getUserByIdDB(user_id);
    } else if (username) {
      // Retrieve user by username if provided
      user = await getUserByUsernameDB(username);
    }

    return user; // Return the user data
  } catch (error) {
    // Log the error for further handling
    logErrorDB("getSingleUserDB", error, next);
  }
}
// -----------------GET SINGLE USER FROM DATABASE---------------

// Export the function for use by other modules.
module.exports = { getSingleUserDB };
