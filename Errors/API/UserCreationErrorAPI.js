/**
 * Custom error class for handling "User Creation" errors in API requests.
 * Extends the base Error class.
 */
class UserCreationErrorAPI extends Error {
  /**
   * Constructor for UserCreationErrorAPI.
   *
   * @param {string} message - Optional error message indicating that there was a problem registering a user.
   *                           Default is "There was a problem registering you".
   */
  constructor(message = "There was a problem registering you") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "UserCreationErrorAPI"; // Set the name of the error
    this.status = 401; // Set the HTTP status code associated with this error (401 Unauthorized)
  }
}

module.exports = UserCreationErrorAPI; // Export the UserCreationErrorAPI class for use in other modules
