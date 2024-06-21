// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE BOOK GENRE DB---------------
/**
 * Creates a new book genre relationship in the database with the provided genre_id and book_id.
 *
 * @param {Object} bookGenreData - Object containing book genre data.
 * @param {number} bookGenreData.genre_id - The ID of the genre.
 * @param {number} bookGenreData.book_id - The ID of the book.
 * @returns {Promise<Object>} A promise that resolves to the created book genre data.
 * @throws {Error} If an error occurs during the book genre creation process.
 *
 * @precondition bookGenreData is an object containing the genre_id and book_id.
 * @postcondition The function returns a Promise that resolves to an object containing the created book genre data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createBookGenreDB({ genre_id, book_id }) {
  try {
    // Insert the book genre relationship into the database, or do nothing if it already exists
    const {
      rows: [book_genre],
    } = await client.query(
      `
      INSERT INTO book_genres(genre_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_genre DO NOTHING
      RETURNING *
      `,
      [genre_id, book_id]
    );

    // Return the created book genre data
    return book_genre;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createBookGenreDB", error);
    throw error;
  }
}
//* -----------------CREATE BOOK GENRE DB---------------

// Export the function for use by other modules.
module.exports = {
  createBookGenreDB,
};
