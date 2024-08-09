// ! ----------------- IMPORTED FILES --------------------------
const { NoInfoProvidedErrorDB } = require("../../../Errors/DB");
const client = require("../../client");
// ! -----------------------------------------------------------

// ----------------- UPDATE BOOK IN DATABASE -------------------
/**
 * Updates a author's information in the database.
 *
 * @param {number} author_id - The ID of the author to update.
 * @param {Object} fields - An object containing the fields to update and their new values.
 * @returns {Promise<Object>} The updated author object.
 * @throws {Error} If an error occurs while querying the database.
 *
 * @precondition The `author_id` must correspond to an existing author in the database.
 *               The `fields` object must contain at least one field to update.
 * @postcondition The function returns a Promise that resolves to the updated author object.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function updateAuthorDB(author_id, fields = {}) {
  console.log(author_id);
  console.log(fields);

  // Create the SET clause for the SQL update statement by mapping the keys of the fields object.
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(",");

  // If there are no fields to update, return early.
  if (setString.length === 0) {
    throw new NoInfoProvidedErrorDB(
      "No information was provided for updateAuthorDB"
    );
  }

  try {
    // Execute the SQL update statement.
    const {
      rows: [author],
    } = await client.query(
      `
        UPDATE authors
        SET ${setString}
        WHERE id=${author_id}
        RETURNING *;
        `,
      // Pass the values of the fields object as parameters to the query.
      Object.values(fields)
    );

    // Return the updated author object.
    return author;
  } catch (error) {
    // If an error occurs, throw it to be handled by the caller.
    logErrorDB("updateAuthorDB", error);
    throw error;
  }
}
// ----------------- UPDATE BOOK IN DATABASE -------------------

// Export the function for use by other modules.
module.exports = updateAuthorDB;
