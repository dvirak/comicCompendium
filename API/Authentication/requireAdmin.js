/**
 * Middleware to ensure the user is an admin.
 * If the user is not an admin, it responds with an error message.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
function requireAdmin(req, res, next) {
  if (!req.user || !req.user.admin) {
    next({
      name: "NotAuthorizedError",
      message: "You must be an admin to perform this action",
    });
  } else {
    next(); // If user is an admin, proceed to the next middleware or route handler
  }
}

// Export the middleware functions for use in other modules
module.exports = requireAdmin;
