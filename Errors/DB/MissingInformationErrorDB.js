/**
 * Custom error class for handling cases where information is missing during request.
 * Extends the base Error class.
 */
class MissingInformationErrorDB extends Error {
  /**
   * Constructor for MissingInformationErrorDB.
   *
   * @param {string} message - Optional error message describing the issue of missing login information.
   */
  constructor(message = "You did not provided all the required information") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "MissingInformationErrorDB"; // Set the name of the error
    this.status = false; // Indicate error state (false)
    this.statusCode = 400; // Set the HTTP status code associated with this error (400 Bad Request)
    this.code = "MISSING_INFO"; // Custom error code for identification
  }
}

module.exports = MissingInformationErrorDB; // Export the MissingBookInfoErrorDB class for use in other modules
