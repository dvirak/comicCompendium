/**
 * Custom error class for handling "User Not Found" errors in API requests.
 * Extends the base Error class.
 */
class UserNotFoundErrorAPI extends Error {
  /**
   * Constructor for UserNotFoundErrorAPI.
   *
   * @param {string} message - Optional error message describing the "user not found" issue.
   *                           Default is "No user found".
   */
  constructor(message = "No user found") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "UserNotFoundErrorAPI"; // Set the name of the error
    this.status = 404; // Set the HTTP status code associated with this error (404 Not Found)
  }
}

module.exports = UserNotFoundErrorAPI; // Export the UserNotFoundErrorAPI class for use in other modules
