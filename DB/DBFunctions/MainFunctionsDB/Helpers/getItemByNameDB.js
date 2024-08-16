// ! ----------------- IMPORTED FILES --------------------------
const { logErrorDB, NotFoundErrorDB } = require("../../../../Errors/DB");
const client = require("../../../client");
// ! -----------------------------------------------------------

// ------------GET SINGLE ITEM BY NAME FROM DATABASE------------
/**
 * Retrieves a single item from the database based on the provided item name.
 *
 * @param {string} item_name - The name of the item to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the item object.
 * @throws {Error} If an error occurs while querying the database or if the item is not found.
 *
 * @precondition item_name is provided and is a valid string.
 * @postcondition The function returns a Promise that resolves to an object containing the item data from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getItemByNameDB(table_name, item_name) {
  const query = `
    SELECT *
    FROM ${table_name}s
    WHERE ${table_name}_name ILIKE $1
  `;

  console.log("IN GET ITEM BY NAME DB");
  console.log("table_name = " + table_name);
  console.log("item_name = " + item_name);

  try {
    // Execute the query to select the item from the desired table where the item_name matches the provided item_name.
    const { rows } = await client.query(query, [item_name]);

    // If no rows are returned, throw an error indicating the item was not found.
    if (rows.length === 0) {
      throw new NotFoundErrorDB(
        `${item_name} was not found in the ${table_name} table.`
      );
    }

    // Return the first row from the fetched rows (item).
    return rows[0];
  } catch (error) {
    // Throw the error for handling by the caller.
    logErrorDB("getItemByNameDB", error);
    throw error;
  }
}

// ------------GET SINGLE ITEM BY NAME FROM DATABASE------------

// Export the function for use by other modules.
module.exports = getItemByNameDB;
