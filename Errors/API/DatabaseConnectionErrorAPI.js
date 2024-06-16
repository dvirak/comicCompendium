/**
 * Custom error class for handling database connection errors.
 * Extends the base Error class.
 */
class DatabaseConnectionErrorAPI extends Error {
  /**
   * Constructor for DatabaseConnectionError.
   *
   * @param {string} message - Optional error message describing the database connection issue.
   *                           Default is "There was an issue trying to reach the database".
   */
  constructor(message = "There was an issue trying to reach the database") {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "DatabaseConnectionErrorAPI"; // Set the name of the error
    this.status = 500; // Set the HTTP status code associated with this error (500 Internal Server Error)
  }
}

module.exports = DatabaseConnectionErrorAPI; // Export the DatabaseConnectionError class for use in other modules
