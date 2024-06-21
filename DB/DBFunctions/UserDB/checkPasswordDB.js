const { logErrorDB } = require("../../../Errors/DB");
const confirmUserDB = require("./confirmUserDB");

// ! ----------------- IMPORTED FILES --------------------------
// Importing logErrorDB from DB error handling module
// Importing confirmUserDB function for user confirmation
// ! -----------------------------------------------------------

/**
 * Checks the user's password by calling the confirmUser function.
 * Returns detailed error messages for various cases.
 *
 * @param {string} username - The username to confirm.
 * @param {string} password - The password to confirm.
 * @returns {Object} A response object indicating the status and a message.
 * @throws {Error} If an error occurs while confirming the user.
 */
async function checkPasswordDB(username, password) {
  try {
    // Calling confirmUserDB function to confirm user credentials
    const response = await confirmUserDB(username, password);
    return response;
  } catch (error) {
    // Logging error for further investigation
    logErrorDB("checkPasswordDB", error);
    throw error;
  }
}

// Exporting checkPasswordDB function for external use
module.exports = checkPasswordDB;
