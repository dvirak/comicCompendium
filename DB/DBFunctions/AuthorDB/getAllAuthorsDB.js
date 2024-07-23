// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

// -----------------GET ALL AUTHORS FROM DATABASE-----------------
/**
 * Retrieves all authors from the database.
 *
 * @returns {Promise<Array>} An array containing all book objects.
 * @throws {Error} If an error occurs while querying the database.
 *
 * @precondition None
 * @postcondition The function returns a Promise that resolves to an array containing all book objects from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getAllAuthorsDB() {
  console.log("IN GET ALL AUTHORS DB");

  try {
    // Query to select all authors from the 'authors' table.
    const { rows } = await client.query(`
      SELECT *
      FROM authors;
    `);

    // Return the fetched rows (authors).
    return rows;
  } catch (error) {
    // Throw the error for handling by the caller.
    logErrorDB("getAllAuthorsDB", error);
    throw error;
  }
}

// -----------------GET ALL AUTHORS FROM DATABASE-----------------

// Export the function for use by other modules.
module.exports = getAllAuthorsDB;
