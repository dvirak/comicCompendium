/**
 * Custom error class for handling cases where no username or password is provided during login.
 * Extends the base Error class.
 */
class MissingBookInfoErrorDB extends Error {
  /**
   * Constructor for MissingBookInfoErrorDB.
   *
   * @param {string} message - Optional error message describing the issue of missing login information.
   */
  constructor(message = "No book_id or book_title provided") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "MissingBookInfoErrorDB"; // Set the name of the error
    this.status = false; // Indicate error state (false)
    this.statusCode = 400; // Set the HTTP status code associated with this error (400 Bad Request)
    this.code = "NO_BOOK_INFO_PROVIDED"; // Custom error code for identification
  }
}

module.exports = MissingBookInfoErrorDB; // Export the MissingBookInfoErrorDB class for use in other modules
