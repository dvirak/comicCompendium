// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE BOOK ILLUSTRATOR DB---------------
/**
 * Creates a new book illustrator relationship in the database with the provided illustrator_id and book_id.
 *
 * @param {Object} bookIllustratorData - Object containing book illustrator data.
 * @param {number} bookIllustratorData.illustrator_id - The ID of the illustrator.
 * @param {number} bookIllustratorData.book_id - The ID of the book.
 * @returns {Promise<Object>} A promise that resolves to the created book illustrator data.
 * @throws {Error} If an error occurs during the book illustrator creation process.
 *
 * @precondition bookIllustratorData is an object containing the illustrator_id and book_id.
 * @postcondition The function returns a Promise that resolves to an object containing the created book illustrator data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createBookIllustratorDB({ illustrator_id, book_id }) {
  try {
    // Insert the book illustrator relationship into the database, or do nothing if it already exists
    const {
      rows: [book_illustrator],
    } = await client.query(
      `
      INSERT INTO book_illustrators(illustrator_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_illustrator DO NOTHING
      RETURNING *
      `,
      [illustrator_id, book_id]
    );

    // Return the created book illustrator data
    return book_illustrator;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createBookIllustratorDB", error);
    throw error;
  }
}
//* -----------------CREATE BOOK ILLUSTRATOR DB---------------

// Export the function for use by other modules.
module.exports = {
  createBookIllustratorDB,
};
