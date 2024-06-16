/**
 * Custom error class for handling cases where no information was provided for update in database operations.
 * Extends the base Error class.
 */
class NoInfoProvidedErrorDB extends Error {
  /**
   * Constructor for NoInfoProvidedErrorDB.
   *
   * @param {string} message - Optional error message describing the issue of no information provided for update.
   */
  constructor(message = "No information was provided for update") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "NoInfoProvidedErrorDB"; // Set the name of the error
    this.status = false; // Indicate error state (false)
    this.statusCode = 400; // Set the HTTP status code associated with this error (400 Bad Request)
    this.code = "NO_INFO_PROVIDED"; // Custom error code for identification
  }
}

module.exports = NoInfoProvidedErrorDB; // Export the NoInfoProvidedErrorDB class for use in other modules
