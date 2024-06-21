// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE BOOK LETTERER DB---------------
/**
 * Creates a new book letterer relationship in the database with the provided letterer_id and book_id.
 *
 * @param {Object} bookLettererData - Object containing book letterer data.
 * @param {number} bookLettererData.letterer_id - The ID of the letterer.
 * @param {number} bookLettererData.book_id - The ID of the book.
 * @returns {Promise<Object>} A promise that resolves to the created book letterer data.
 * @throws {Error} If an error occurs during the book letterer creation process.
 *
 * @precondition bookLettererData is an object containing the letterer_id and book_id.
 * @postcondition The function returns a Promise that resolves to an object containing the created book letterer data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createBookLettererDB({ letterer_id, book_id }) {
  try {
    // Insert the book letterer relationship into the database, or do nothing if it already exists
    const {
      rows: [book_letterer],
    } = await client.query(
      `
      INSERT INTO book_letterers(letterer_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_letterer DO NOTHING
      RETURNING *
      `,
      [letterer_id, book_id]
    );

    // Return the created book letterer data
    return book_letterer;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createBookLettererDB", error);
    throw error;
  }
}
//* -----------------CREATE BOOK LETTERER DB---------------

// Export the function for use by other modules.
module.exports = {
  createBookLettererDB,
};
