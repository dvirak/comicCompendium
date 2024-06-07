// ! ----------------- IMPORTED LIBRARIES --------------------------
const jwt = require("jsonwebtoken");
// ! -----------------------------------------------------------

// ! ---------------- IMPORTED LOCAL FILES --------------------
const { createUserDB } = require("../../DB/DBFunctions/UserDB/createUserDB");
const {
  getSingleUserDB,
} = require("../../DB/DBFunctions/UserDB/GetUsersDB/getSingleUserDB");
const { JWT_SECRET = "jafhjafkw935809gyaGEh0aljkgn" } = process.env;
// ! -----------------------------------------------------------

/**
 * Handles API requests to create a new user.
 * Validates the provided user information,
 * creates a new user in the database if valid,
 * and generates a JWT token for the new user.
 *
 * @param {Object} req - The request object, containing user details in the body.
 * @param {Object} res - The response object, used to send back the user data or an error message.
 * @param {Function} next - The next middleware function in the request-response cycle.
 */
async function createUserAPI(req, res, next) {
  // Extract user details from the request body
  const {
    username,
    password,
    first_name,
    last_name,
    preferred_name,
    phone,
    email,
    admin,
  } = req.body;

  console.log("IN CREATE USER API");

  try {
    // Check if the user already exists
    let userData = { username };
    const queriedUser = await getSingleUserDB(req.body);
    if (queriedUser) {
      // If user exists, send an error response
      next({
        status: 401,
        name: "UserExistsError",
        message: "A user by the username already exists",
      });
    } else if (password.length < 8) {
      // If password is too short, send an error response
      next({
        status: 401,
        name: "PasswordLengthError",
        message: "Password must be at least 8 characters",
      });
    } else {
      // Create the new user in the database
      const user = await createUserDB(req.body);
      if (!user) {
        // If user creation failed, send an error response
        next({
          status: 401,
          name: "UserCreationError",
          message: "There was a problem registering you",
        });
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
    next({
      status: 500,
      message: error.message,
    });
  }
}

module.exports = createUserAPI;
