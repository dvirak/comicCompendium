// ! ----------------- IMPORTED LIBRARIES --------------------------
const jwt = require("jsonwebtoken");

// ! ---------------- IMPORTED MODULES -------------------------
const {
  getSingleUserDB,
} = require("../../DB/DBFunctions/UserDB/GetUsersDB/getSingleUserDB"); // Adjust the path as needed
const JWT_SECRET = process.env.JWT_SECRET;
// ! -----------------------------------------------------------

/**
 * Middleware function to set the user in the request object based on the JWT token.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
async function setUser(req, res, next) {
  // Define the prefix used for the Authorization header
  const prefix = "Bearer ";

  // Get the Authorization header from the request
  const auth = req.header("Authorization");

  // Check if the Authorization header is present
  if (!auth) {
    // If not present, move to the next middleware
    next();
  } else if (auth.startsWith(prefix)) {
    // If the header starts with the specified prefix
    const token = auth.slice(prefix.length);
    try {
      // Verify the JWT token using the secret
      const parsedToken = jwt.verify(token, JWT_SECRET);

      // Extract the user ID from the parsed token
      const id = parsedToken && parsedToken.id;

      // If a valid user ID is present in the token
      if (id) {
        // Get the user data from the database using the user ID
        req.user = await getSingleUserDB(id);

        // Move to the next middleware
        next();
      } else {
        // If the token is malformed, send an error response
        next({
          name: "AuthorizationHeaderError",
          message: "Authorization token malformed",
        });
      }
    } catch ({ name, message }) {
      // If an error occurs during token verification, send an error response
      next({ name, message });
    }
  } else {
    // If the Authorization header is not formatted correctly, send an error response
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
}

module.exports = setUser;
