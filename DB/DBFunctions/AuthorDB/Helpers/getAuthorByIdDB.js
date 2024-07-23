// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../../client");
const { logErrorDB, AuthorNotFoundErrorDB } = require("../../../../Errors/DB/");

// ! -----------------------------------------------------------

// ------------GET SINGLE AUTHOR BY ID FROM DATABASE------------
/**
 * Retrieves a single author from the database based on the provided author ID.
 *
 * @param {number} author_id - The ID of the author to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the author object.
 * @throws {Error} If an error occurs while querying the database or if the author is not found.
 *
 * @precondition author_id is provided and is a valid number.
 * @postcondition The function returns a Promise that resolves to an object containing the author data from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getAuthorByIdDB(author_id) {
  const query = `
    SELECT *
    FROM authors
    WHERE id = $1
  `;

  try {
    // Execute the query to select the author from the 'authors' table where the ID matches the provided author_id.
    const { rows } = await client.query(query, [author_id]);

    // If no rows are returned, throw an error indicating the author was not found.
    if (rows.length === 0) {
      throw new AuthorNotFoundErrorDB();
    }

    // Return the first row from the fetched rows (author).
    return rows[0];
  } catch (error) {
    // Throw the error for handling by the caller.
    logErrorDB("getAuthorByIdDB", error);
    throw error;
  }
}

// ------------GET SINGLE AUTHOR BY ID FROM DATABASE------------

// Export the function for use by other modules.
module.exports = getAuthorByIdDB;
