const { getBookByIdDB, getBookByNameDB } = require("./helpers");

/**
 * Retrieves a single book from the database based on the provided book_id or book_name.
 *
 * @param {number} [book_id] - The ID of the book to retrieve.
 * @param {string} [book_name] - The name of the book to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the book data.
 * @throws {Error} If neither book_id nor book_name is provided, or if the book is not found.
 */
async function getSingleBookDB(book_id, book_name) {
  console.log("IN GET SINGLE BOOK DB");

  if (!book_id && !book_name) {
    throw new Error("Either book_id or book_name must be provided.");
  }

  let book;

  if (book_id) {
    book = await getBookByIdDB(book_id);
  } else if (book_name) {
    book = await getBookByNameDB(book_name);
  }

  if (!book) {
    throw new Error("Book not found.");
  }

  return book;
}

module.exports = { getSingleBookDB };