// ! ----------------- IMPORTED LIBRARIES --------------------------
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "jafhjafkw935809gyaGEh0aljkgn" } = process.env;
// ! -----------------------------------------------------------

// ! ---------------- IMPORTED LOCAL FILES --------------------
const { confirmUserDB } = require("../../DB/DBFunctions/UserDB");
const {
  DatabaseConnectionErrorAPI,
  AuthenticationErrorLoginAPI,
  logErrorAPI,
} = require("../../Errors/API");
const InputErrorLoginAPI = require("../../Errors/API/InputErrorLoginAPI");
// ! -----------------------------------------------------------

/**
 * Handles API requests to log in a user.
 * Verifies the provided username and password,
 * generates a JWT token upon successful login,
 * and sends back the user information along with the token.
 *
 * @param {Object} req - The request object, containing the username and password in the body.
 * @param {Object} res - The response object, used to send back the user data or an error message.
 * @param {Function} next - The next middleware function in the request-response cycle.
 */
async function confirmUserAPI(req, res, next) {
  console.log("IN CONFIRM USER");
  // Extract username and password from the request body
  const { username, password } = req.body;

  const userId = Number(req.params.user_id);

  try {
    // Check if username or password is missing
    if (!username || !password) {
      // Send an error response if either username or password is missing
      throw new InputErrorLoginAPI();
    }

    // Attempt to confirm user credentials
    const response = await confirmUserDB(username, password, next);

    console.log("RESPONSE: ");
    console.log(response);

    if (!response) {
      console.log("IF NOT RESPONSE....");
      throw new DatabaseConnectionErrorAPI();
    } else if (response.status === false) {
      throw new AuthenticationErrorLoginAPI();
    } else if (response.user.id !== userId) {
      throw new AuthenticationErrorLoginAPI(
        "You can only delete your own account."
      );
    } else {
      // Send the user information along with the token in the response
      res.status(200).json({
        status: true,
        message: `Username and password confirmed`,
      });
    }
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("confirmUserAPI", error, next);
  }
}

module.exports = confirmUserAPI;
