/**
 * Custom error class for handling user table login input validation errors in API requests.
 * Extends the base Error class.
 */
class InputErrorLoginAPI extends Error {
  /**
   * Constructor for InputErrorLoginAPI.
   *
   * @param {string} message - Optional error message describing the input validation issue.
   *                           Default is "Please supply both a username and password".
   */
  constructor(message = "Please supply both a username and password") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "InputErrorLoginAPI"; // Set the name of the error
    this.status = 400; // Set the HTTP status code associated with this error (400 Bad Request)
  }
}

module.exports = InputErrorLoginAPI; // Export the InputErrorLoginAPI class for use in other modules
