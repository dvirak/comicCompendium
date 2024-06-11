// ! ----------------- IMPORTED LIBRARIES --------------------------
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "jafhjafkw935809gyaGEh0aljkgn" } = process.env;
// ! -----------------------------------------------------------

// ! ---------------- IMPORTED LOCAL FILES --------------------
const {
  confirmUser,
} = require("../../DB/DBFunctions/UserDB/GetUsersDB/confirmUser");
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
async function loginUserAPI(req, res, next) {
  console.log("IN LOGIN USER");
  // Extract username and password from the request body
  const { username, password } = req.body;

  try {
    // Check if username or password is missing
    if (!username || !password) {
      // Send an error response if either username or password is missing
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password",
      });
    }

    // Attempt to confirm user credentials
    const response = await confirmUser(username, password);

    // If user credentials are not valid, send an error response
    if (!response) {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    } else {
      // If user credentials are valid, generate a JWT token
      const token = jwt.sign(
        { id: response.user.id, username: response.user.username },
        JWT_SECRET,
        { expiresIn: "1w" }
      );
      // Send the user information along with the token in the response
      res.send({
        response,
        message: `You're logged in ${response.user.username}!`,
        token,
      });
    }
  } catch (error) {
    // Handle errors and send an appropriate response
    res.status(500).json({ error: error.message });
  }
}

module.exports = loginUserAPI;
