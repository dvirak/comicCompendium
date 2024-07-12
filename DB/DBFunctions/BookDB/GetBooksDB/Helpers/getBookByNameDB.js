// ! ----------------- IMPORTED FILES --------------------------
const { logErrorDB, BookNotFoundErrorDB } = require("../../../../../Errors/DB");
const client = require("../../../../client");

// Import the requireUser function from the utils module.
// const { requireUser } = require('/utils');
// ! -----------------------------------------------------------

// ------------GET SINGLE BOOK BY NAME FROM DATABASE------------
/**
 * Retrieves a single book from the database based on the provided book name.
 *
 * @param {string} title - The name of the book to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the book object.
 * @throws {Error} If an error occurs while querying the database or if the book is not found.
 *
 * @precondition title is provided and is a valid string.
 * @postcondition The function returns a Promise that resolves to an object containing the book data from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getBookByNameDB(title) {
  const query = `
    SELECT *
    FROM books
    WHERE title ILIKE $1
  `;

  try {
    // Execute the query to select the book from the 'books' table where the title matches the provided title.
    const { rows } = await client.query(query, [title]);

    // If no rows are returned, throw an error indicating the book was not found.
    if (rows.length === 0) {
      throw new BookNotFoundErrorDB();
    }

    // Return the first row from the fetched rows (book).
    return rows[0];
  } catch (error) {
    // Throw the error for handling by the caller.
    logErrorDB("getBookByNameDB", error);
    throw error;
  }
}

// ------------GET SINGLE BOOK BY NAME FROM DATABASE------------

// Export the function for use by other modules.
module.exports = getBookByNameDB;
