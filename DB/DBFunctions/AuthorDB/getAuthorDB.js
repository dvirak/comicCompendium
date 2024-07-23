// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
const {
  logErrorDB,
  MissingAuthorInfoErrorDB,
  AuthorNotFoundErrorDB,
} = require("../../../Errors/DB");
const { getAuthorByIdDB, getAuthorByNameDB } = require("./Helpers");
// ! -----------------------------------------------------------

// ------------GET AUTHOR FROM DATABASE------------
/**
 * Retrieves a single author from the database based on the provided author ID.
 *
 * @param {number} author_id - The ID of the author being retrieved.
 * @returns {Promise<Object>} A promise that resolves to the author object.
 * @throws {Error} If an error occurs while querying the database or if the author is not found.
 *
 * @precondition author_id is provided and is a valid number.
 * @postcondition The function returns a Promise that resolves to an object containing the author's data from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getAuthorDB({ author_id, author_name }) {
  console.log("IN GET AUTHOR DB");
  console.log(author_name);

  try {
    if (!author_id && !author_name) {
      // Throw an error if neither author_id nor author_name is provided
      throw new MissingAuthorInfoErrorDB();
    }

    let author;

    if (author_id) {
      // Retrieve author by author_id if provided
      author = await getAuthorByIdDB(author_id);
    } else if (author_name) {
      // Retrieve book by author_name if provided
      author = await getAuthorByNameDB(author_name);
    }

    if (!author) {
      // Throw an error if the book is not found
      throw new AuthorNotFoundErrorDB();
    }

    // Return the first row from the fetched rows (author).
    return author;
  } catch (error) {
    // Throw the error for handling by the caller.
    logErrorDB("getAuthorDB", error);
    throw error;
  }
}

// ------------GET BOOK'S AUTHOR FROM DATABASE------------

// Export the function for use by other modules.
module.exports = getAuthorDB;
