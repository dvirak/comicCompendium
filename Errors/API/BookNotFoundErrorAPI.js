/**
 * Custom error class for handling "Book Not Found" errors in API requests.
 * Extends the base Error class.
 */
class BookNotFoundErrorAPI extends Error {
  /**
   * Constructor for BookNotFoundErrorAPI.
   *
   * @param {string} message - Optional error message describing the "book not found" issue.
   *                           Default is "There was an issue trying to reach the database".
   */
  constructor(message = "The book you are searching for was not found") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "BookNotFoundErrorAPI"; // Set the name of the error
    this.status = 404; // Set the HTTP status code associated with this error (404 Not Found)
  }
}

module.exports = BookNotFoundErrorAPI; // Export the BookNotFoundError class for use in other modules
