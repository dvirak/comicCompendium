/**
 * Custom error class for handling "Token Verification" errors in API requests.
 * Extends the base Error class.
 */
class TokenVerificationErrorAPI extends Error {
  /**
   * Constructor for TokenVerificationErrorAPI.
   *
   * @param {string} message - Optional error message indicating that there was an issue verifying a token.
   */
  constructor(message) {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "TokenVerificationErrorAPI"; // Set the name of the error
    this.status = 401; // Set the HTTP status code associated with this error (401 Unauthorized)
  }
}

module.exports = TokenVerificationErrorAPI; // Export the TokenVerificationErrorAPI class for use in other modules
