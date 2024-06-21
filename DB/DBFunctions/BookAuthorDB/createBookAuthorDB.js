// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE BOOK AUTHOR DB---------------
/**
 * Creates a new book author relationship in the database with the provided author_id and book_id.
 *
 * @param {Object} bookAuthorData - Object containing book author data.
 * @param {number} bookAuthorData.author_id - The ID of the author.
 * @param {number} bookAuthorData.book_id - The ID of the book.
 * @returns {Promise<Object>} A promise that resolves to the created book author data.
 * @throws {Error} If an error occurs during the book author creation process.
 *
 * @precondition bookAuthorData is an object containing the author_id and book_id.
 * @postcondition The function returns a Promise that resolves to an object containing the created book author data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createBookAuthorDB({ author_id, book_id }) {
  try {
    // Insert the book author relationship into the database, or do nothing if it already exists
    const {
      rows: [book_author],
    } = await client.query(
      `
      INSERT INTO book_authors(author_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_author DO NOTHING
      RETURNING *
      `,
      [author_id, book_id]
    );

    // Return the created book author data
    return book_author;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createBookAuthorDB", error);
    throw error;
  }
}
//* -----------------CREATE BOOK AUTHOR DB---------------

// Export the function for use by other modules.
module.exports = {
  createBookAuthorDB,
};
