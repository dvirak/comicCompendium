// ! ----------------- IMPORTED FILES --------------------------
const { NoInfoProvidedErrorDB, logErrorDB } = require("../../../Errors/DB"); // Error handling utilities
const client = require("../../client"); // Database client connection
// ! -----------------------------------------------------------

/**
 * Updates an item's information in the database.
 *
 * @param {string} table_name - The name of the database table where the item resides.
 * @param {number} item_id - The ID of the item to update.
 * @param {Object} fields - An object containing the fields to update and their new values.
 * @returns {Promise<Object>} The updated item object.
 * @throws {NoInfoProvidedErrorDB} If no fields are provided for update.
 * @throws {Error} If an error occurs while querying the database.
 *
 * @precondition The `item_id` must correspond to an existing item in the specified table.
 *               The `fields` object must contain at least one field to update.
 * @postcondition The function returns a Promise that resolves to the updated item object from the database.
 *                If an error occurs, the function logs and throws the error for further handling.
 */

async function updateItemDB(table_name, item_id, fields = {}) {
  console.log("IN UPDATE ITEM DB"); // Log start of function execution
  console.log(item_id); // Log the provided item ID
  console.log(fields); // Log the fields to be updated

  // Create the SET clause for the SQL update statement using the fields object.
  // Map the keys of the fields object to SQL columns, with each field's index offset for parameterized queries.
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 1}`) // Create `column_name = $1, column_name = $2, ...` structure
    .join(",");

  const query = `
        UPDATE ${table_name}s
        SET ${setString}
        WHERE id = $${Object.keys(fields).length + 1} 
        RETURNING *;
        `;

  // If no fields are provided, throw an error indicating that no information was given for the update.
  if (setString.length === 0) {
    throw new NoInfoProvidedErrorDB(
      "No information was provided for updateItemDB"
    );
  }

  try {
    // Execute the SQL update query and return the updated item.
    const {
      rows: [item], // Destructure the first row from the result
    } = await client.query(
      query,
      // Provide values to fill in the parameterized query ($1, $2, etc.) in order, followed by the item_id.
      [...Object.values(fields), item_id]
    );

    // Return the updated item object.
    return item;
  } catch (error) {
    // Log any errors that occur and rethrow them for handling by the caller.
    logErrorDB("updateItemDB", error);
    throw error;
  }
}

module.exports = updateItemDB;
