// ! ----------------- IMPORTED FILES --------------------------
const { formatCategories } = require("../../../API/bookController/Helpers"); // Helper functions for formatting categories
const { logErrorDB, NotFoundErrorDB } = require("../../../Errors/DB"); // Database error handling functions
const client = require("../../client"); // Database client for executing queries
const { formatGetBooksByCategoryQueryDB } = require("./helpers");
// ! -----------------------------------------------------------

/**
 * Description: Retrieves books from the database based on specified categories.
 * @param {Object} categories - An object where the keys are category names and values are category IDs.
 * @returns {Promise<Array>} - Returns a promise that resolves to an array of books matching the specified categories.
 * @throws {NotFoundErrorDB} If no books are found matching the specified categories.
 */
async function getBooksByCategoryDB(categories) {
  console.log("IN getBooksByCategoryDB"); // Debug log to indicate function execution

  const { query, values } = formatGetBooksByCategoryQueryDB(categories);

  try {
    // Execute the query and retrieve results
    const { rows } = await client.query(query, values);

    // Throw an error if no books are found
    if (rows.length === 0) {
      throw new NotFoundErrorDB(
        `No books were found for ${formatCategories(categories)}`
      );
    }

    return rows; // Return the found books
  } catch (error) {
    // Log error and rethrow it for further handling
    logErrorDB("getBooksByCategoryDB", error);
    throw error;
  }
}

module.exports = getBooksByCategoryDB; // Export the function for use in other modules
