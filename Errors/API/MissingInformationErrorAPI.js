/**
 * Custom error class for handling "Missing Information" errors in API requests.
 * Extends the base Error class.
 */
class MissingInformationErrorAPI extends Error {
  /**
   * Constructor for MissingInformationErrorAPI.
   *
   * @param {string} message - Optional error message describing the missing information issue.
   *                           Default is "Missing required information".
   */
  constructor(message = "Missing required information") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "MissingInformationErrorAPI"; // Set the name of the error
    this.status = 400; // Set the HTTP status code associated with this error (400 Bad Request)
    this.code = "MISSING_INFORMATION"; // Custom error code for identification
  }
}

module.exports = MissingInformationErrorAPI; // Export the MissingInformationErrorAPI class for use in other modules
