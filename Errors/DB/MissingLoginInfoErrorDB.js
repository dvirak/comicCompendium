/**
 * Custom error class for handling cases where no username or password is provided during login.
 * Extends the base Error class.
 */
class MissingLoginInfoErrorDB extends Error {
  /**
   * Constructor for MissingLoginInfoErrorDB.
   *
   * @param {string} message - Optional error message describing the issue of missing login information.
   */
  constructor(message = "No username or password provided") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "MissingLoginInfoErrorDB"; // Set the name of the error
    this.status = false; // Indicate error state (false)
    this.statusCode = 400; // Set the HTTP status code associated with this error (400 Bad Request)
    this.code = "NO_LOGIN_INFO_PROVIDED"; // Custom error code for identification
  }
}

module.exports = MissingLoginInfoErrorDB; // Export the MissingLoginInfoErrorDB class for use in other modules
