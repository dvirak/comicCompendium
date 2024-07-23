// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
const { logErrorDB, BookNotFoundErrorDB } = require("../../../Errors/DB/");

// ! -----------------------------------------------------------

// ------------GET BOOK'S AUTHOR FROM DATABASE------------
/**
 * Retrieves a single book from the database based on the provided book ID.
 *
 * @param {number} book_id - The ID of the book whose author is being retrieved.
 * @returns {Promise<Object>} A promise that resolves to the book_author object.
 * @throws {Error} If an error occurs while querying the database or if the book is not found.
 *
 * @precondition book_id is provided and is a valid number.
 * @postcondition The function returns a Promise that resolves to an object containing the book's author data from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getBookAuthorDB(book_id) {
  console.log("IN GET BOOK AUTHORS DB");
  const query = `
    SELECT *
    FROM book_authors
    WHERE id = $1
  `;

  try {
    // Execute the query to select the book from the 'books' table where the ID matches the provided book_id.
    const { rows } = await client.query(query, [book_id]);

    // // If no rows are returned, throw an error indicating the book was not found.
    // if (rows.length === 0) {
    //   throw new BookNotFoundErrorDB();
    // }

    // Return the first row from the fetched rows (book).
    return rows;
  } catch (error) {
    // Throw the error for handling by the caller.
    logErrorDB("getBookAuthorDB", error);
    throw error;
  }
}

// ------------GET BOOK'S AUTHOR FROM DATABASE------------

// Export the function for use by other modules.
module.exports = getBookAuthorDB;
