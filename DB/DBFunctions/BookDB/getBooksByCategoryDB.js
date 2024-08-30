// ! ----------------- IMPORTED FILES --------------------------
const { formatCategories } = require("../../../API/bookController/Helpers"); // Helper functions for formatting categories
const { logErrorDB, NotFoundErrorDB } = require("../../../Errors/DB"); // Database error handling functions
const client = require("../../client"); // Database client for executing queries
// ! -----------------------------------------------------------

/**
 * Description: Retrieves books from the database based on specified categories.
 * @param {Object} categories - An object where the keys are category names and values are category IDs.
 * @returns {Promise<Array>} - Returns a promise that resolves to an array of books matching the specified categories.
 * @throws {NotFoundErrorDB} If no books are found matching the specified categories.
 */
async function getBooksByCategoryDB(categories) {
  console.log("IN getBooksByCategoryDB"); // Debug log to indicate function execution

  let joinClauses = []; // Clauses for joining tables
  let values = []; // Values for query parameters
  let whereClauses = []; // Clauses for the WHERE condition in the query

  // Construct JOIN and WHERE clauses based on categories
  for (const [category, id] of Object.entries(categories)) {
    joinClauses.push(
      `JOIN book_${category}s ON books.id = book_${category}s.book_id`
    );
    joinClauses.push(
      `JOIN ${category}s ON book_${category}s.${category}_id = ${category}s.id`
    );
    whereClauses.push(`${category}s.id`);
    values.push(id);
  }

  const joinQuery = joinClauses.join("\n"); // Combine all JOIN clauses into a single string

  const query = `
  SELECT books.*
  FROM books
  ${joinQuery}
  WHERE ${whereClauses
    .map((element, index) => `${element} = $${index + 1}`)
    .join(" AND ")}
  `; // Construct the SQL query with dynamic JOIN and WHERE clauses

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
