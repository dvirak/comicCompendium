const { NotAuthorizedErrorAPI } = require("../../Errors/API");
const NotAdminErrorAPI = require("../../Errors/API/NotAdminErrorAPI");
const { logErrorDB } = require("../../Errors/DB");

/**
 * Middleware to ensure the user is an admin.
 * If the user is not an admin, it responds with an error message.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
function requireAdmin(req, res, next) {
  console.log("in require admin");
  try {
    if (!req.user.admin || !req.user) {
      throw new NotAuthorizedErrorAPI();
    } else {
      next(); // If user is an admin, proceed to the next middleware or route handler
    }
  } catch (error) {
    if (
      (error.message = "Cannot read properties of undefined (reading 'admin')")
    ) {
      throw new NotAuthorizedErrorAPI();
    }
    logErrorDB("confirmUserDB", error);
    throw error;
  }
}
// Export the middleware functions for use in other modules
module.exports = requireAdmin;
