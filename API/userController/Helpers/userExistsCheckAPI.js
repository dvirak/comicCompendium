const {
  getSingleUserDB,
} = require("../../../DB/DBFunctions/UserDB/GetUsersDB");
const { UserNotFoundErrorDB } = require("../../../Errors/DB");

/**
 * Helper function to check if user exists by username and handle UserNotFoundErrorDB. Specifically for createUserAPI.
 *
 * @param {string} username - The username to search for.
 * @returns {Promise<Object | null>} A promise resolving to the user object if found, or null if not found.
 */
async function userExistsCheckAPI(username) {
  try {
    // Call getSingleUserDB to retrieve user by username
    const user = await getSingleUserDB({ username });
    return user;
  } catch (error) {
    if (error instanceof UserNotFoundErrorDB) {
      // Return null if user is not found
      return null;
    }
    // Propagate other errors
    throw error;
  }
}

module.exports = userExistsCheckAPI;
