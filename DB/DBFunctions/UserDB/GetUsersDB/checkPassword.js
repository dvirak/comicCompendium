const { confirmUser } = require("./confirmUser");

/**
 * Checks the user's password by calling the confirmUser function.
 * Returns detailed error messages for various cases.
 *
 * @param {string} username - The username to confirm.
 * @param {string} password - The password to confirm.
 * @returns {Object} A response object indicating the status and a message.
 * @throws {Error} If an error occurs while confirming the user.
 */
async function checkPassword(username, password) {
  try {
    const response = await confirmUser(username, password);

    if (!response) {
      return {
        status: false,
        message: "An error occurred during password confirmation",
      };
    }

    return response;
  } catch (error) {
    console.error("Error in checkPassword:", error);
    throw error;
  }
}

module.exports = { checkPassword };
