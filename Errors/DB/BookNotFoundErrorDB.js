/**
 * Custom error class for handling cases where a book was not found in database operations.
 * Extends the base Error class.
 */
class BookNotFoundErrorDB extends Error {
  /**
   * Constructor for BookNotFoundErrorDB.
   *
   * @param {string} message - Optional error message describing the issue of no book found.
   */
  constructor(message = "No book found") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "BookNotFoundErrorDB"; // Set the name of the error
    this.status = false; // Indicate error state (false)
    this.statusCode = 404; // Set the HTTP status code associated with this error (404 Not Found)
    this.code = "BOOK_NOT_FOUND"; // Custom error code for identification
  }
}

module.exports = BookNotFoundErrorDB; // Export the BookNotFoundErrorDB class for use in other modules
