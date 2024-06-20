// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../../client");

// Import the requireUser function from the utils module.
// const { requireUser } = require('/utils');
// ! -----------------------------------------------------------

// -----------------GET ALL BOOKS FROM DATABASE-----------------
/**
 * Retrieves all books from the database.
 *
 * @returns {Promise<Array>} An array containing all book objects.
 * @throws {Error} If an error occurs while querying the database.
 *
 * @precondition None
 * @postcondition The function returns a Promise that resolves to an array containing all book objects from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getAllBooksBasicDB() {
  console.log("IN GET ALL BOOKS BASIC DB");

  try {
    // Query to select all books from the 'books' table.
    const { rows } = await client.query(`
      SELECT *
      FROM books;
    `);

    // Return the fetched rows (books).
    return rows;
  } catch (error) {
    // Throw the error for handling by the caller.
    logErrorDB("getAllBooksDB", error);
    throw error;
  }
}

// -----------------GET ALL BOOKS FROM DATABASE-----------------

// Export the function for use by other modules.
module.exports = getAllBooksBasicDB;
