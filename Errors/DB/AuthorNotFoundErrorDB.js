/**
 * Custom error class for handling cases where a author was not found in database operations.
 * Extends the base Error class.
 */
class AuthorNotFoundErrorDB extends Error {
  /**
   * Constructor for AuthorNotFoundErrorDB.
   *
   * @param {string} message - Optional error message describing the issue of no author found.
   */
  constructor(message = "No author found") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "AuthorNotFoundErrorDB"; // Set the name of the error
    this.status = false; // Indicate error state (false)
    this.statusCode = 404; // Set the HTTP status code associated with this error (404 Not Found)
    this.code = "AUTHOR_NOT_FOUND"; // Custom error code for identification
  }
}

module.exports = AuthorNotFoundErrorDB; // Export the BookNotFoundErrorDB class for use in other modules
