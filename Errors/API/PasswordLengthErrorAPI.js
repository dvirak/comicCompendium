/**
 * Custom error class for handling "Password Length" errors in API requests.
 * Extends the base Error class.
 */
class PasswordLengthErrorAPI extends Error {
  /**
   * Constructor for PasswordLengthErrorAPI.
   *
   * @param {string} message - Optional error message indicating that the provided password is too short.
   */
  constructor(message = "Password must be at least 8 characters") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "PasswordLengthErrorAPI"; // Set the name of the error
    this.status = 401; // Set the HTTP status code associated with this error (401 Unauthorized)
  }
}

module.exports = PasswordLengthErrorAPI; // Export the PasswordLengthErrorAPI class for use in other modules
