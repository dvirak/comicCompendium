// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE BOOK COLORIST DB---------------
/**
 * Creates a new book colorist relationship in the database with the provided colorist_id and book_id.
 *
 * @param {Object} bookColoristData - Object containing book colorist data.
 * @param {number} bookColoristData.colorist_id - The ID of the colorist.
 * @param {number} bookColoristData.book_id - The ID of the book.
 * @returns {Promise<Object>} A promise that resolves to the created book colorist data.
 * @throws {Error} If an error occurs during the book colorist creation process.
 *
 * @precondition bookColoristData is an object containing the colorist_id and book_id.
 * @postcondition The function returns a Promise that resolves to an object containing the created book colorist data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createBookColoristDB({ colorist_id, book_id }) {
  try {
    // Insert the book colorist relationship into the database, or do nothing if it already exists
    const {
      rows: [book_colorist],
    } = await client.query(
      `
      INSERT INTO book_colorists(colorist_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_colorist DO NOTHING
      RETURNING *
      `,
      [colorist_id, book_id]
    );

    // Return the created book colorist data
    return book_colorist;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createBookColoristDB", error);
    throw error;
  }
}
//* -----------------CREATE BOOK COLORIST DB---------------

// Export the function for use by other modules.
module.exports = {
  createBookColoristDB,
};
