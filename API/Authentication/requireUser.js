const { NotLoggedInErrorAPI } = require("../../Errors/API");

/**
 * Middleware to ensure a user is logged in.
 * If no user is found in the request, it responds with a 401 status and an error message.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
function requireUser(req, res, next) {
  console.log("IN REQUIRE USER");
  if (!req.user) {
    throw new NotLoggedInErrorAPI();
  } else {
    next(); // If user is found, proceed to the next middleware or route handler
  }
}

// Export the middleware functions for use in other modules
module.exports = requireUser;
