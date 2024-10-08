// ! ----------------- IMPORTED FILES --------------------------
const { getBookByIdDB, getBookByNameDB } = require("./Helpers");
const {
  MissingBookInfoErrorDB,
  BookNotFoundErrorDB,
  logErrorDB,
} = require("../../../../Errors/DB");
// ! -----------------------------------------------------------

// -----------------GET SINGLE BOOK FROM DATABASE---------------
/**
 * Retrieves a single book from the database based on the provided book_id or title.
 *
 * @param {number} [book_id] - The ID of the book to retrieve.
 * @param {string} [title] - The name of the book to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the book data.
 * @throws {Error} If neither book_id nor title is provided, or if the book is not found.
 *
 * @precondition An object containing either a book_id or a title.
 * @postcondition The function returns a Promise that resolves to an object containing the book data from the database.
 *                If an error occurs, the function throws an error.
 */
async function getSingleBookDB({ book_id, title }) {
  console.log("IN GET SINGLE BOOK DB");

  try {
    if (!book_id && !title) {
      // Throw an error if neither book_id nor title is provided
      throw new MissingBookInfoErrorDB();
    }

    let book;

    if (book_id) {
      // Retrieve book by book_id if provided
      book = await getBookByIdDB(book_id);
    } else if (title) {
      // Retrieve book by title if provided
      book = await getBookByNameDB(title);
    }

    if (!book) {
      // Throw an error if the book is not found
      return null;
    }

    console.log("BOOK = ");
    console.log(book);

    // Return the book data
    return book;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("getSingleBookDB", error);
    throw error;
  }
}
// -----------------GET SINGLE BOOK FROM DATABASE---------------

// Export the function for use by other modules.
module.exports = getSingleBookDB;
