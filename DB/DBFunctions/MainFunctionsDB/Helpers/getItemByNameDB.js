// ! ----------------- IMPORTED FILES --------------------------
const { logErrorDB, NotFoundErrorDB } = require("../../../../Errors/DB"); // Error handling utilities
const client = require("../../../client"); // Database client connection
// ! -----------------------------------------------------------

/**
 * Retrieves a single item from the database based on the provided item name.
 *
 * @param {string} table_name - The name of the database table from which to retrieve the item.
 * @param {string} item_name - The name of the item to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the item object.
 * @throws {NotFoundErrorDB} If the item with the provided name is not found in the specified table.
 * @throws {Error} If an error occurs while querying the database.
 *
 * @precondition `table_name` is a valid string representing the database table.
 *               `item_name` is provided and is a valid string.
 * @postcondition The function returns a Promise that resolves to an object containing the item data from the database.
 *                If the item is not found or an error occurs during the query, the function logs the error and throws it.
 */
async function getItemByNameDB(table_name, item_name) {
  // Define the query to select an item by name from the specified table
  const query = `
    SELECT *
    FROM ${table_name == "series" ? "serie" : table_name}s
    WHERE ${table_name}_name ILIKE $1
  `;

  console.log("IN GET ITEM BY NAME DB"); // Log the start of the function execution
  console.log(table_name);
  console.log(item_name);

  try {
    // Execute the query with the provided item name
    const { rows } = await client.query(query, [item_name]);

    // Check if the query returned any rows
    if (rows.length === 0) {
      return null;
      // Throw an error if no item was found with the given name
      // throw new NotFoundErrorDB(
      //   `${item_name} was not found in the ${table_name} table.`
      // );
    }

    // Return the first row from the result set (the item)
    return rows[0];
  } catch (error) {
    // Log the error and rethrow it for handling by the caller
    logErrorDB("getItemByNameDB", error);
    throw error;
  }
}

module.exports = getItemByNameDB;
