/**
 * Custom error class for handling author table input validation errors in API requests.
 * Extends the base Error class.
 */
class InputErrorAuthorsAPI extends Error {
  /**
   * Constructor for InputErrorAPI.
   *
   * @param {string} message - Optional error message describing the input validation issue.
   *                           Default is "Either user_id or username must be provided.".
   */
  constructor(message = "Either author_id or author_name must be provided.") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "InputErrorAuthorsAPI"; // Set the name of the error
    this.status = 400; // Set the HTTP status code associated with this error (400 Bad Request)
  }
}

module.exports = InputErrorAuthorsAPI; // Export the InputErrorAPI class for use in other modules
