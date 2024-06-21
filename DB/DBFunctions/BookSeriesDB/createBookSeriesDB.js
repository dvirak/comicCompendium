// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE BOOK SERIES DB---------------
/**
 * Creates a new book series relationship in the database with the provided series_id and book_id.
 *
 * @param {Object} bookSeriesData - Object containing book series data.
 * @param {number} bookSeriesData.series_id - The ID of the series.
 * @param {number} bookSeriesData.book_id - The ID of the book.
 * @returns {Promise<Object>} A promise that resolves to the created book series data.
 * @throws {Error} If an error occurs during the book series creation process.
 *
 * @precondition bookSeriesData is an object containing the series_id and book_id.
 * @postcondition The function returns a Promise that resolves to an object containing the created book series data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createBookSeriesDB({ series_id, book_id }) {
  try {
    // Insert the book series relationship into the database, or do nothing if it already exists
    const {
      rows: [book_series],
    } = await client.query(
      `
      INSERT INTO book_series(series_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_series DO NOTHING
      RETURNING *
      `,
      [series_id, book_id]
    );

    // Return the created book series data
    return book_series;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createBookSeriesDB", error);
    throw error;
  }
}
//* -----------------CREATE BOOK SERIES DB---------------

// Export the function for use by other modules.
module.exports = {
  createBookSeriesDB,
};
