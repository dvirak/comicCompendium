// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../../../client");

// Import the requireUser function from the utils module.
// const { requireUser } = require('/utils');
// ! -----------------------------------------------------------

// ------------GET SINGLE BOOK BY ID FROM DATABASE------------
/**
 * Retrieves a single book from the database based on the provided book ID.
 *
 * @param {number} book_id - The ID of the book to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the book object.
 * @throws {Error} If an error occurs while querying the database or if the book is not found.
 *
 * @precondition book_id is provided and is a valid number.
 * @postcondition The function returns a Promise that resolves to an object containing the book data from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getBookByIdDB(book_id) {
  console.log("IN GET BOOK BY ID DB");

  const query = `
    SELECT *
    FROM books
    WHERE id = $1
  `;

  try {
    // Execute the query to select the book from the 'books' table where the ID matches the provided book_id.
    const { rows } = await client.query(query, [book_id]);

    // If no rows are returned, throw an error indicating the book was not found.
    if (rows.length === 0) {
      throw new Error("Book not found.");
    }

    // Return the first row from the fetched rows (book).
    return rows[0];
  } catch (err) {
    console.log(`Error occurred in GET BOOK BY ID DB: ${err}`);
    // Throw the error for handling by the caller.
    throw err;
  }
}

// ------------GET SINGLE BOOK BY ID FROM DATABASE------------

// Export the function for use by other modules.
module.exports = { getBookByIdDB };
