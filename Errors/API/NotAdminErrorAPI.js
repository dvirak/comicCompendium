/**
 * Custom error class for handling "Not Admin" errors in API requests.
 * Extends the base Error class.
 */
class NotAdminErrorAPI extends Error {
  /**
   * Constructor for NotAdminErrorAPI.
   *
   * @param {string} message - Optional error message. Default is "You do not have permission to access this resource.".
   */
  constructor(message = "You do not have permission to access this resource.") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "NotAdminErrorAPI"; // Set the name of the error
    this.status = 403; // Set the HTTP status code associated with this error (403 Forbidden)
  }
}

module.exports = NotAdminErrorAPI;
