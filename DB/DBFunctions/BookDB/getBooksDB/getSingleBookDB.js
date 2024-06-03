const { getBookByIdDB, getBookByNameDB } = require("./Helpers");

/**
 * Retrieves a single book from the database based on the provided book_id or book_title.
 *
 * @param {number} [book_id] - The ID of the book to retrieve.
 * @param {string} [book_title] - The name of the book to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the book data.
 * @throws {Error} If neither book_id nor book_title is provided, or if the book is not found.
 */
async function getSingleBookDB(book_id, book_title) {
  console.log("IN GET SINGLE BOOK DB");
  console.log("book_id");

  if (!book_id && !book_title) {
    throw new Error("Either book_id or book_title must be provided.");
  }

  let book;

  if (book_id) {
    book = await getBookByIdDB(book_id);
  } else if (book_title) {
    book = await getBookByNameDB(book_title);
  }

  if (!book) {
    throw new Error("Book not found.");
  }

  return book;
}

module.exports = { getSingleBookDB };
