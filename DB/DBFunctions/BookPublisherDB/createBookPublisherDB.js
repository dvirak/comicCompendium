// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE BOOK PUBLISHER DB---------------
/**
 * Creates a new book publisher relationship in the database with the provided publisher_id and book_id.
 *
 * @param {Object} bookPublisherData - Object containing book publisher data.
 * @param {number} bookPublisherData.publisher_id - The ID of the publisher.
 * @param {number} bookPublisherData.book_id - The ID of the book.
 * @returns {Promise<Object>} A promise that resolves to the created book publisher data.
 * @throws {Error} If an error occurs during the book publisher creation process.
 *
 * @precondition bookPublisherData is an object containing the publisher_id and book_id.
 * @postcondition The function returns a Promise that resolves to an object containing the created book publisher data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createBookPublisherDB({ publisher_id, book_id }) {
  try {
    // Insert the book publisher relationship into the database, or do nothing if it already exists
    const {
      rows: [book_publisher],
    } = await client.query(
      `
      INSERT INTO book_publishers(publisher_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_publisher DO NOTHING
      RETURNING *
      `,
      [publisher_id, book_id]
    );

    // Return the created book publisher data
    return book_publisher;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createBookPublisherDB", error);
    throw error;
  }
}
//* -----------------CREATE BOOK PUBLISHER DB---------------

// Export the function for use by other modules.
module.exports = {
  createBookPublisherDB,
};
