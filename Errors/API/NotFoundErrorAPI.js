/**
 * Custom error class for handling "Not Found" errors in API requests.
 * Extends the base Error class.
 */
class NotFoundErrorAPI extends Error {
  /**
   * Constructor for BookNotFoundErrorAPI.
   *
   * @param {string} message - Optional error message describing the "book not found" issue.
   *                           Default is "There was an issue trying to reach the database".
   */
  constructor(message = "The data you were looking for was not found") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "NotFoundErrorAPI"; // Set the name of the error
    this.status = 404; // Set the HTTP status code associated with this error (404 Not Found)
    this.code = "NOT_FOUND"; // Custom error code for identification
  }
}

module.exports = NotFoundErrorAPI; // Export the NotFoundError class for use in other modules
