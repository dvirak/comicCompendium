/**
 * Custom error class for handling "Not Found" errors in DB requests.
 * Extends the base Error class.
 */
class NotFoundErrorDB extends Error {
  /**
   * Constructor for NotFoundErrorDB.
   *
   * @param {string} message - Optional error message describing the "not found" issue.
   *                           Default is "The data you were looking for was not found in the Database".
   */
  constructor(
    message = "The data you were looking for was not found in the Database"
  ) {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "NotFoundErrorDB"; // Set the name of the error
    this.status = 404; // Set the HTTP status code associated with this error (404 Not Found)
    this.code = "NOT_FOUND_DB"; // Custom error code for identification
  }
}

module.exports = NotFoundErrorDB; // Export the NotFoundError class for use in other modules
