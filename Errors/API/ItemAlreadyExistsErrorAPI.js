/**
 * Custom error class for handling "Item Exists" errors in API requests.
 * Extends the base Error class.
 */
class ItemAlreadyExistsErrorAPI extends Error {
  /**
   * Constructor for ItemAlreadyExistsErrorAPI.
   *
   * @param {string} message - Optional error message describing the "item exists" issue.
   *                           Default is "An instance of this item already exists in the database".
   */
  constructor(
    message = "An instance of this item already exists in the database"
  ) {
    super(message); // Call the constructor of Error class with the provided message
    this.name = "ItemAlreadyExistsErrorAPI"; // Set the name of the error
    this.status = 404; // Set the HTTP status code associated with this error (409 Conflict)
  }
}

module.exports = ItemAlreadyExistsErrorAPI; // Export the ItemAlreadyExistsError class for use in other modules
