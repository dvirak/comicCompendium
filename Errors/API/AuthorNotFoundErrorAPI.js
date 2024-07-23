/**
 * Custom error class for handling "Author Not Found" errors in API requests.
 * Extends the base Error class.
 */
class AuthorNotFoundErrorAPI extends Error {
  /**
   * Constructor for AuthorNotFoundErrorAPI.
   *
   * @param {string} message - Optional error message describing the "author not found" issue.
   *                           Default is "No author found".
   */
  constructor(message = "No author found") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "AuthorNotFoundErrorAPI"; // Set the name of the error
    this.status = 404; // Set the HTTP status code associated with this error (404 Not Found)
  }
}

module.exports = AuthorNotFoundErrorAPI; // Export the AuthorNotFoundErrorAPI class for use in other modules
