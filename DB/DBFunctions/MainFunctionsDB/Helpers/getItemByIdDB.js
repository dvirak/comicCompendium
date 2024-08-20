// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../../client"); // Database client connection
const { logErrorDB, NotFoundErrorDB } = require("../../../../Errors/DB/"); // Error handling utilities
// ! -----------------------------------------------------------

/**
 * Retrieves a single item from the database based on the provided item ID.
 *
 * @param {string} table_name - The name of the database table from which to retrieve the item.
 * @param {number} item_id - The ID of the item to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the item object.
 * @throws {NotFoundErrorDB} If the item with the provided ID is not found in the specified table.
 * @throws {Error} If an error occurs while querying the database.
 *
 * @precondition `table_name` is a valid string representing the database table.
 *               `item_id` is provided and is a valid number.
 * @postcondition The function returns a Promise that resolves to an object containing the item data from the database.
 *                If the item is not found or an error occurs during the query, the function logs the error and throws it.
 */
async function getItemByIdDB(table_name, item_id) {
  // Define the query to select an item by ID from the specified table
  const query = `
    SELECT *
    FROM ${table_name}s
    WHERE id = $1
  `;

  try {
    // Execute the query with the provided item ID
    const { rows } = await client.query(query, [item_id]);

    // Check if the query returned any rows
    if (rows.length === 0) {
      // Throw an error if no item was found with the given ID
      throw new NotFoundErrorDB(
        `${table_name} with ID ${item_id} was not found`
      );
    }

    // Return the first row from the result set (the item)
    return rows[0];
  } catch (error) {
    // Log the error and rethrow it for handling by the caller
    logErrorDB("getItemByIdDB", error);
    throw error;
  }
}

module.exports = getItemByIdDB;
