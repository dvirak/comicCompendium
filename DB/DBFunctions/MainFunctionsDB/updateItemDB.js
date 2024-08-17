// ! ----------------- IMPORTED FILES --------------------------
const { NoInfoProvidedErrorDB, logErrorDB } = require("../../../Errors/DB");
const client = require("../../client");
// ! -----------------------------------------------------------

// ----------------- UPDATE ITEM IN DATABASE -------------------
/**
 * Updates a item's information in the database.
 *
 * @param {number} item_id - The ID of the item to update.
 * @param {Object} fields - An object containing the fields to update and their new values.
 * @returns {Promise<Object>} The updated item object.
 * @throws {Error} If an error occurs while querying the database.
 *
 * @precondition The `item_id` must correspond to an existing item in the database.
 *               The `fields` object must contain at least one field to update.
 * @postcondition The function returns a Promise that resolves to the updated item object.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function updateItemDB(table_name, item_id, fields = {}) {
  console.log("IN UPDATE ITEM DB");
  console.log(item_id);
  console.log(fields);

  // Create the SET clause for the SQL update statement by mapping the keys of the fields object.
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(",");

  // If there are no fields to update, return early.
  if (setString.length === 0) {
    throw new NoInfoProvidedErrorDB(
      "No information was provided for updateItemDB"
    );
  }

  try {
    // Execute the SQL update statement.
    const {
      rows: [item],
    } = await client.query(
      `
        UPDATE ${table_name}s
        SET ${setString}
        WHERE id=${item_id}
        RETURNING *;
        `,
      // Pass the values of the fields object as parameters to the query.
      Object.values(fields)
    );

    // Return the updated item object.
    return item;
  } catch (error) {
    // If an error occurs, throw it to be handled by the caller.
    logErrorDB("updateItemDB", error);
    throw error;
  }
}
// ----------------- UPDATE ITEM IN DATABASE -------------------

// Export the function for use by other modules.
module.exports = updateItemDB;
