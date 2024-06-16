/**
 * Custom error class for handling authentication errors during login API requests.
 * Extends the base Error class.
 */
class AuthenticationErrorLoginAPI extends Error {
  /**
   * Constructor for AuthenticationErrorLoginAPI.
   *
   * @param {string} message - Optional error message describing the authentication error.
   */
  constructor(message = "An authentication error occurred") {
    super(message); // Call the constructor of Error class with the provided message

    this.name = "AuthenticationErrorLoginAPI"; // Set the name of the error
    this.status = 401; // Set the HTTP status code associated with this error (401 Unauthorized)
  }
}

module.exports = AuthenticationErrorLoginAPI; // Export the AuthenticationErrorLoginAPI class for use in other modules
