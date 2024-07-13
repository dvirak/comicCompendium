/**
 * Custom error class for handling "CantEdit" errors in API requests.
 * Extends the base Error class.
 */
class CantEditErrorAPI extends Error {
  /**
   * Constructor for CantEditErrorAPI.
   *
   * @param {string} message - Optional error message. Default is "You do not have permission to access this resource.".
   */
  constructor(message = "You cannot edit this here.") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "CantEditErrorAPI"; // Set the name of the error
    this.status = 403; // Set the HTTP status code associated with this error (403 Forbidden)
    this.code = "CANT_CHANGE_ID"; // Custom error code for identification
  }
}

module.exports = CantEditErrorAPI;
