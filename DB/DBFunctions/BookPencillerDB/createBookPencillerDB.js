// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE BOOK PENCILLER DB---------------
/**
 * Creates a new book penciller relationship in the database with the provided penciller_id and book_id.
 *
 * @param {Object} bookPencillerData - Object containing book penciller data.
 * @param {number} bookPencillerData.penciller_id - The ID of the penciller.
 * @param {number} bookPencillerData.book_id - The ID of the book.
 * @returns {Promise<Object>} A promise that resolves to the created book penciller data.
 * @throws {Error} If an error occurs during the book penciller creation process.
 *
 * @precondition bookPencillerData is an object containing the penciller_id and book_id.
 * @postcondition The function returns a Promise that resolves to an object containing the created book penciller data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createBookPencillerDB({ penciller_id, book_id }) {
  try {
    // Insert the book penciller relationship into the database, or do nothing if it already exists
    const {
      rows: [book_penciller],
    } = await client.query(
      `
      INSERT INTO book_pencillers(penciller_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_penciller DO NOTHING
      RETURNING *
      `,
      [penciller_id, book_id]
    );

    // Return the created book penciller data
    return book_penciller;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createBookPencillerDB", error);
    throw error;
  }
}
//* -----------------CREATE BOOK PENCILLER DB---------------

// Export the function for use by other modules.
module.exports = {
  createBookPencillerDB,
};
