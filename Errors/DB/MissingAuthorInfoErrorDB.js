/**
 * Custom error class for handling cases where no username or password is provided during login.
 * Extends the base Error class.
 */
class MissingAuthorInfoErrorDB extends Error {
  /**
   * Constructor for MissingAuthorInfoErrorDB.
   *
   * @param {string} message - Optional error message describing the issue of missing login information.
   */
  constructor(message = "No author_id or author_name provided") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "MissingAuthorInfoErrorDB"; // Set the name of the error
    this.status = false; // Indicate error state (false)
    this.statusCode = 400; // Set the HTTP status code associated with this error (400 Bad Request)
    this.code = "NO_AUTHOR_INFO_PROVIDED"; // Custom error code for identification
  }
}

module.exports = MissingAuthorInfoErrorDB; // Export the MissingAuthorInfoErrorDB class for use in other modules
