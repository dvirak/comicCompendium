/**
 * Custom error class for handling "User Exists" errors in API requests.
 * Extends the base Error class.
 */
class UserExistsErrorAPI extends Error {
  /**
   * Constructor for UserExistsErrorAPI.
   *
   * @param {string} message - Optional error message indicating that a user with the given username already exists.
   *                           Default is "A user with that username already exists".
   */
  constructor(message = "A user with that username already exists") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "UserExistsErrorAPI"; // Set the name of the error
    this.status = 401; // Set the HTTP status code associated with this error (401 Unauthorized)
  }
}

module.exports = UserExistsErrorAPI; // Export the UserExistsErrorAPI class for use in other modules
