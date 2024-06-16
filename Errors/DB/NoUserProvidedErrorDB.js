/**
 * Custom error class for handling cases where no user identifier (user_id or username) was provided in database operations.
 * Extends the base Error class.
 */
class NoUserProvidedErrorDB extends Error {
  /**
   * Constructor for NoUserProvidedErrorDB.
   *
   * @param {string} message - Optional error message describing the issue of no user identifier provided.
   */
  constructor(message = "Either user_id or username must be provided") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "NoUserProvidedErrorDB"; // Set the name of the error
    this.status = false; // Indicate error state (false)
    this.statusCode = 400; // Set the HTTP status code associated with this error (400 Bad Request)
    this.code = "NO_USER_PROVIDED"; // Custom error code for identification
  }
}

module.exports = NoUserProvidedErrorDB; // Export the NoUserProvidedErrorDB class for use in other modules
