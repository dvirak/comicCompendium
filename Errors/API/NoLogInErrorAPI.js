/**
 * Custom error class for handling "Not Logged In" errors in API requests.
 * Extends the base Error class.
 */
class NotLoggedInErrorAPI extends Error {
  /**
   * Constructor for NotLoggedInErrorAPI.
   *
   * @param {string} message - Optional error message describing the "not logged in" issue.
   *                           Default is "You must be logged in to perform this action".
   */
  constructor(message = "You must be logged in to perform this action") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "NotLoggedInErrorAPI"; // Set the name of the error
    this.status = 401; // Set the HTTP status code associated with this error (401 Unauthorized)
  }
}

module.exports = NotLoggedInErrorAPI; // Export the NotLoggedInErrorAPI class for use in other modules
