/**
 * Custom error class for handling "Not Authorized" errors in DB requests.
 * Extends the base Error class.
 */

class NotAuthorizedErrorDB extends Error {
  /**
   * Constructor for NotAuthorizedErrorDB.
   *
   * @param {string} message - Optional error message. Default is "You do not have permission to access this resource.".
   */
  constructor(message = "You do not have permission to access this resource.") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "NotAuthorizedErrorDB"; // Set the name of the error
    this.status = 401; // Set the HTTP status code associated with this error (403 Forbidden)
    this.code = "NOT_AUTHORIZED"; // Custom error code for identification
  }
}

module.exports = NotAuthorizedErrorDB;
