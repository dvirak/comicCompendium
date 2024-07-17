// ! ----------------- IMPORTED FILES --------------------------
const { logErrorDB } = require("../../../Errors/DB");
const client = require("../../client");
// ! -----------------------------------------------------------

/**
 * Description: Deletes a book from the database.
 *
 * @param {number} book_id - The ID of the book to be deleted.
 * @returns {Object} An object containing the status of the operation, a message, and the deleted book's title.
 * @throws {Error} If an error occurs while deleting the book.
 *
 * @precondition The book_id must be a valid existing book ID in the database.
 * @postcondition The book with the specified ID is deleted from the database.
 */
async function deleteBookDB(book_id) {
  try {
    // Perform the database query to delete the book
    const {
      rows: [book],
    } = await client.query(
      `
      DELETE FROM books
      WHERE id = $1
      RETURNING title;
    `,
      [book_id]
    );

    // Return success status and the deleted book's title
    return {
      status: true,
      name: "BookDeleted",
      message: "Deletion Success!",
      book,
    };
  } catch (error) {
    // Log any errors that occur and throw them for the caller to handle
    logErrorDB("deleteBookDB", error);
    throw error;
  }
}

module.exports = deleteBookDB;
