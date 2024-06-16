/**
 * Custom error class for handling authorization header errors in API requests.
 * Extends the base Error class.
 */
class AuthorizationHeaderErrorAPI extends Error {
  /**
   * Constructor for AuthorizationHeaderErrorAPI.
   *
   * @param {string} message - Optional error message describing the authorization header issue.
   */
  constructor(message) {
    super(message); // Call the constructor of Error class with the provided message
    this.name = `AuthorizationHeaderErrorAPI`; // Set the name of the error
    this.status = 401; // Set the HTTP status code associated with this error (401 Unauthorized)
  }
}

module.exports = AuthorizationHeaderErrorAPI; // Export the AuthorizationHeaderErrorAPI class for use in other modules
