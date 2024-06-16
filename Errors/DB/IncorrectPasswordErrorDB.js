/**
 * Custom error class for handling incorrect password errors in database operations.
 * Extends the base Error class.
 */
class IncorrectPasswordErrorDB extends Error {
  /**
   * Constructor for IncorrectPasswordErrorDB.
   *
   * @param {string} message - Optional error message describing the incorrect password issue.
   */
  constructor(message = "Incorrect password") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "IncorrectPasswordErrorDB"; // Set the name of the error
    this.status = false; // Indicate error state (false)
    this.statusCode = 401; // Set the HTTP status code associated with this error (401 Unauthorized)
    this.code = "INCORRECT_PASSWORD"; // Custom error code for identification
  }
}

module.exports = IncorrectPasswordErrorDB; // Export the IncorrectPasswordErrorDB class for use in other modules
