/**
 * Custom error class for handling cases where no username is provided during a database operation.
 * Extends the base Error class.
 */
class MissingUsernameErrorDB extends Error {
  /**
   * Constructor for MissingUsernameErrorDB.
   *
   * @param {string} message - Optional error message describing the issue of missing username.
   */
  constructor(message = "No username provided") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "MissingUsernameErrorDB"; // Set the name of the error
    this.status = false; // Indicate error state (false)
    this.statusCode = 400; // Set the HTTP status code associated with this error (400 Bad Request)
    this.code = "NO_USERNAME_PROVIDED"; // Custom error code for identification
  }
}

module.exports = MissingUsernameErrorDB; // Export the MissingUsernameErrorDB class for use in other modules
