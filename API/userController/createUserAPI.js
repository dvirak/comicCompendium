// ! ----------------- IMPORTED LIBRARIES --------------------------
const jwt = require("jsonwebtoken");
// ! -----------------------------------------------------------

// ! ---------------- IMPORTED LOCAL FILES --------------------
const { createUserDB } = require("../../DB/DBFunctions/UserDB/createUserDB");
const {
  getSingleUserDB,
} = require("../../DB/DBFunctions/UserDB/GetUsersDB/getSingleUserDB");
const {
  PasswordLengthErrorAPI,
  UserCreationErrorAPI,
  UserExistsErrorAPI,
} = require("../../Errors/API");
const { JWT_SECRET = "jafhjafkw935809gyaGEh0aljkgn" } = process.env;
// ! -----------------------------------------------------------

/**
 * Handles API requests to create a new user.
 * Validates the provided user information,
 * creates a new user in the database if valid,
 * and generates a JWT token for the new user.
 *
 * @param {Object} req - The request object, containing user details in the body.
 *                       Contains username (string), password (string), first_name (string),
 *                       last_name (string), preferred_name (string), phone (int), email (string).
 *                       Optionally contains admin (boolean).
 * @param {Object} res - The response object, used to send back the user data or an error message.
 * @param {Function} next - The next middleware function in the request-response cycle.
 */
async function createUserAPI(req, res, next) {
  // Extract user details from the request body
  console.log("IN CREATE USER API");

  if (req.body.admin !== true) {
    req.body.admin = false;
  }

  try {
    // Check if the user already exists
    const queriedUser = await getSingleUserDB(req.body);
    if (queriedUser) {
      // If user exists, send an error response
      throw new UserExistsErrorAPI();
    } else if (req.body.password.length < 8) {
      // If password is too short, send an error response
      throw new PasswordLengthErrorAPI();
    } else {
      // Create the new user in the database
      const user = await createUserDB(req.body);
      if (!user) {
        // If user creation failed, send an error response
        throw new UserCreationErrorAPI();
      } else {
        // Generate a JWT token for the new user
        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: "1w" }
        );
        // Send the user information along with the token in the response
        res.send({ user, message: "You're signed up!", token });
      }
    }
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error("Error in createUserAPI: " + error);
    next({
      status: error.status || 500,
      name: error.name,
      message: error.message,
    });
  }
}

module.exports = createUserAPI;
