// ! ----------------- IMPORTED FILES --------------------------
const { NoInfoProvidedErrorDB, logErrorDB } = require("../../../Errors/DB");
const client = require("../../client");
// ! -----------------------------------------------------------

// ----------------- UPDATE BOOK IN DATABASE -------------------
/**
 * Updates a illustrator's information in the database.
 *
 * @param {number} illustrator_id - The ID of the illustrator to update.
 * @param {Object} fields - An object containing the fields to update and their new values.
 * @returns {Promise<Object>} The updated illustrator object.
 * @throws {Error} If an error occurs while querying the database.
 *
 * @precondition The `illustrator_id` must correspond to an existing illustrator in the database.
 *               The `fields` object must contain at least one field to update.
 * @postcondition The function returns a Promise that resolves to the updated illustrator object.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function updateIllustratorDB(illustrator_id, fields = {}) {
  console.log(illustrator_id);
  console.log(fields);

  // Create the SET clause for the SQL update statement by mapping the keys of the fields object.
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(",");

  // If there are no fields to update, return early.
  if (setString.length === 0) {
    throw new NoInfoProvidedErrorDB(
      "No information was provided for updateIllustratorDB"
    );
  }

  try {
    // Execute the SQL update statement.
    const {
      rows: [illustrator],
    } = await client.query(
      `
        UPDATE illustrators
        SET ${setString}
        WHERE id=${illustrator_id}
        RETURNING *;
        `,
      // Pass the values of the fields object as parameters to the query.
      Object.values(fields)
    );

    // Return the updated illustrator object.
    return illustrator;
  } catch (error) {
    // If an error occurs, throw it to be handled by the caller.
    logErrorDB("updateIllustratorDB", error);
    throw error;
  }
}
// ----------------- UPDATE BOOK IN DATABASE -------------------

// Export the function for use by other modules.
module.exports = updateIllustratorDB;
