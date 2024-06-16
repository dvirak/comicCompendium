const NotAdminErrorAPI = require("../../Errors/API/NotAdminErrorAPI");

/**
 * Middleware to ensure the user is an admin.
 * If the user is not an admin, it responds with an error message.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
function requireAdmin(req, res, next) {
  if (!req.user.admin) {
    throw new NotAdminErrorAPI();
  } else {
    next(); // If user is an admin, proceed to the next middleware or route handler
  }
}

// Export the middleware functions for use in other modules
module.exports = requireAdmin;
