// ! ----------------- IMPORTED FILES --------------------------
const { logErrorDB, AuthorNotFoundErrorDB } = require("../../../../Errors/DB");
const client = require("../../../client");
// ! -----------------------------------------------------------

// ------------GET SINGLE AUTHOR BY NAME FROM DATABASE------------
/**
 * Retrieves a single author from the database based on the provided author name.
 *
 * @param {string} author_name - The name of the author to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the author object.
 * @throws {Error} If an error occurs while querying the database or if the author is not found.
 *
 * @precondition author_name is provided and is a valid string.
 * @postcondition The function returns a Promise that resolves to an object containing the author data from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getAuthorByNameDB(author_name) {
  const query = `
    SELECT *
    FROM authors
    WHERE author_name ILIKE $1
  `;

  try {
    // Execute the query to select the author from the 'authors' table where the author_name matches the provided author_name.
    const { rows } = await client.query(query, [author_name]);

    // If no rows are returned, throw an error indicating the author was not found.
    if (rows.length === 0) {
      throw new AuthorNotFoundErrorDB();
    }

    // Return the first row from the fetched rows (author).
    return rows[0];
  } catch (error) {
    // Throw the error for handling by the caller.
    logErrorDB("getAuthorByNameDB", error);
    throw error;
  }
}

// ------------GET SINGLE AUTHOR BY NAME FROM DATABASE------------

// Export the function for use by other modules.
module.exports = getAuthorByNameDB;
