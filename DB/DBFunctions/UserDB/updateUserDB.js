// ! ----------------- IMPORTED FILES --------------------------
const NoInfoProvidedErrorDB = require("../../../Errors/DB");
const client = require("../../client");
// ! -----------------------------------------------------------

// ----------------- UPDATE USER IN DATABASE -------------------
/**
 * Updates a user's information in the database.
 *
 * @param {number} id - The ID of the user to update.
 * @param {Object} fields - An object containing the fields to update and their new values.
 * @returns {Promise<Object>} The updated user object.
 * @throws {Error} If an error occurs while querying the database.
 *
 * @precondition The `id` must correspond to an existing user in the database.
 *               The `fields` object must contain at least one field to update.
 * @postcondition The function returns a Promise that resolves to the updated user object.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function updateUserDB(id, fields = {}) {
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
      rows: [user],
    } = await client.query(
      `
        UPDATE users
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `,
      // Pass the values of the fields object as parameters to the query.
      Object.values(fields)
    );

    // Return the updated user object.
    return user;
  } catch (error) {
    // If an error occurs, throw it to be handled by the caller.
    logErrorDB("updateUserDB", error);
    throw error;
  }
}
// ----------------- UPDATE USER IN DATABASE -------------------

// Export the function for use by other modules.
module.exports = updateUserDB;
