// ! ----------------- IMPORTED FILES --------------------------
const { logErrorDB } = require("../../../Errors/DB");
const client = require("../../client");
// ! -----------------------------------------------------------

/**
 * Description: Deletes a author from the database.
 *
 * @param {number} author_id - The ID of the author to be deleted.
 * @returns {Object} An object containing the status of the operation, a message, and the deleted author's title.
 * @throws {Error} If an error occurs while deleting the author.
 *
 * @precondition The author_id must be a valid existing author ID in the database.
 * @postcondition The author with the specified ID is deleted from the database.
 */
async function deleteAuthorDB(author_id) {
  try {
    // Perform the database query to delete the author
    const {
      rows: [author],
    } = await client.query(
      `
      DELETE FROM authors
      WHERE id = $1
      RETURNING author_name;
    `,
      [author_id]
    );

    // Return success status and the deleted author's name
    return {
      status: true,
      name: "AuthorDeleted",
      message: "Deletion Success!",
      author,
    };
  } catch (error) {
    // Log any errors that occur and throw them for the caller to handle
    logErrorDB("deleteAuthorDB", error);
    throw error;
  }
}

module.exports = deleteAuthorDB;
