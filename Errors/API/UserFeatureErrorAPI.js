/**
 * Custom error class for handling "User Feature Error" errors in API requests.
 * Extends the base Error class.
 */
class UserFeatureErrorAPI extends Error {
  /**
   * Constructor for UserFeatureErrorAPI.
   *
   * @param {string} message - Optional error message describing the "User Feature" issue.
   *                           Default is "Must have an account to access this feature".
   */
  constructor(message = "Must have an account to access this feature") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "UserFeatureErrorAPI"; // Set the name of the error
    this.status = 401; // Set the HTTP status code associated with this error (401 Unauthorized)
  }
}

module.exports = UserFeatureErrorAPI; // Export the UserFeatureErrorAPI class for use in other modules
