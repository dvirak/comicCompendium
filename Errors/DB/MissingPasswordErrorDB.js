/**
 * Custom error class for handling cases where no password is provided during a database operation.
 * Extends the base Error class.
 */
class MissingPasswordErrorDB extends Error {
  /**
   * Constructor for MissingPasswordErrorDB.
   *
   * @param {string} message - Optional error message describing the issue of missing password.
   */
  constructor(message = "No password provided") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "MissingPasswordErrorDB"; // Set the name of the error
    this.status = false; // Indicate error state (false)
    this.statusCode = 400; // Set the HTTP status code associated with this error (400 Bad Request)
    this.code = "NO_PASSWORD_PROVIDED"; // Custom error code for identification
  }
}

module.exports = MissingPasswordErrorDB; // Export the MissingPasswordErrorDB class for use in other modules
