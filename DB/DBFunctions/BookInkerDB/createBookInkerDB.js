// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE BOOK INKER DB---------------
/**
 * Creates a new book inker relationship in the database with the provided inker_id and book_id.
 *
 * @param {Object} bookInkerData - Object containing book inker data.
 * @param {number} bookInkerData.inker_id - The ID of the inker.
 * @param {number} bookInkerData.book_id - The ID of the book.
 * @returns {Promise<Object>} A promise that resolves to the created book inker data.
 * @throws {Error} If an error occurs during the book inker creation process.
 *
 * @precondition bookInkerData is an object containing the inker_id and book_id.
 * @postcondition The function returns a Promise that resolves to an object containing the created book inker data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createBookInkerDB({ inker_id, book_id }) {
  try {
    // Insert the book inker relationship into the database, or do nothing if it already exists
    const {
      rows: [book_inker],
    } = await client.query(
      `
      INSERT INTO book_inkers(inker_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_inker DO NOTHING
      RETURNING *
      `,
      [inker_id, book_id]
    );

    // Return the created book inker data
    return book_inker;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createBookInkerDB", error);
    throw error;
  }
}
//* -----------------CREATE BOOK INKER DB---------------

// Export the function for use by other modules.
module.exports = {
  createBookInkerDB,
};
