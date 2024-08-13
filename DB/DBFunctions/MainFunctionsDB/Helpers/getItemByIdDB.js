// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../../client");
const { logErrorDB, NotFoundErrorDB } = require("../../../../Errors/DB/");

// ! -----------------------------------------------------------

// ------------GET SINGLE ITEM BY ID FROM DATABASE------------
/**
 * Retrieves a single item from the database based on the provided item ID.
 *
 * @param {number} item_id - The ID of the item to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the item object.
 * @throws {Error} If an error occurs while querying the database or if the item is not found.
 *
 * @precondition item_id is provided and is a valid number.
 * @postcondition The function returns a Promise that resolves to an object containing the item data from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getItemByIdDB(table_name, item_id) {
  const query = `
    SELECT *
    FROM ${table_name}s
    WHERE id = $1
  `;

  try {
    // Execute the query to select the item from the 'items' table where the ID matches the provided item_id.
    const { rows } = await client.query(query, [item_id]);

    // If no rows are returned, throw an error indicating the item was not found.
    if (rows.length === 0) {
      throw new NotFoundErrorDB(
        `${table_name} with ID ${item_id} was not found`
      );
    }

    // Return the first row from the fetched rows (item).
    return rows[0];
  } catch (error) {
    // Throw the error for handling by the caller.
    logErrorDB("getItemByIdDB", error);
    throw error;
  }
}

// ------------GET SINGLE ITEM BY ID FROM DATABASE------------

// Export the function for use by other modules.
module.exports = getItemByIdDB;
