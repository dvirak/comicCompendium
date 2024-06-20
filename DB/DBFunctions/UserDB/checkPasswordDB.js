const { logErrorDB } = require("../../../Errors/DB");
const confirmUserDB = require("./confirmUserDB");

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
    const response = await confirmUserDB(username, password);
    return response;
  } catch (error) {
    logErrorDB("checkPasswordDB", error);
    throw error;
  }
}

module.exports = checkPasswordDB;
