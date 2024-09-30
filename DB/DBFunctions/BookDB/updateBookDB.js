// ! ----------------- IMPORTED FILES --------------------------
const { NoInfoProvidedErrorDB, logErrorDB } = require("../../../Errors/DB");
const client = require("../../client");
// ! -----------------------------------------------------------

// ----------------- UPDATE BOOK IN DATABASE -------------------
/**
 * Updates a book's information in the database.
 *
 * @param {number} book_id - The ID of the book to update.
 * @param {Object} fields - An object containing the fields to update and their new values.
 * @returns {Promise<Object>} The updated book object.
 * @throws {Error} If an error occurs while querying the database.
 *
 * @precondition The `book_id` must correspond to an existing book in the database.
 *               The `fields` object must contain at least one field to update.
 * @postcondition The function returns a Promise that resolves to the updated book object.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function updateBookDB(book_id, fields = {}) {
  console.log("IN UPDATEBOOKDB");

  // Create the SET clause for the SQL update statement by mapping the keys of the fields object.
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(",");

  // If there are no fields to update, return early.
  if (setString.length === 0) {
    throw new NoInfoProvidedErrorDB();
  }

  try {
    // Execute the SQL update statement.
    const {
      rows: [book],
    } = await client.query(
      `
        UPDATE books
        SET ${setString}
        WHERE id=${book_id}
        RETURNING *;
        `,
      // Pass the values of the fields object as parameters to the query.
      Object.values(fields)
    );

    // Return the updated book object.
    return book;
  } catch (error) {
    // If an error occurs, throw it to be handled by the caller.
    logErrorDB("updateBookDB", error);
    throw error;
  }
}
// ----------------- UPDATE BOOK IN DATABASE -------------------

// Export the function for use by other modules.
module.exports = updateBookDB;
