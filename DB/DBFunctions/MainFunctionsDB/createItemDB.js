// ! ----------------- IMPORTED FILES --------------------------
const { logErrorDB } = require("../../../Errors/DB"); // Error logging module
const client = require("../../client"); // Database client connection
// ! -----------------------------------------------------------

/**
 * Creates a new item in the specified database table using the provided item name.
 *
 * @param {Object} itemData - Object containing data to insert.
 * @param {string} itemData.table_name - The name of the database table.
 * @param {string} itemData.item_name - The name of the item to create.
 * @returns {Promise<Object>} A promise that resolves to the created item data.
 * @throws {Error} If an error occurs during the item creation process.
 *
 * @precondition itemData is an object containing the table_name and item_name.
 * @postcondition The function returns a Promise that resolves to an object containing the created item data from the database.
 *                If the item already exists, no new record is created. If an error occurs, the function logs the error and throws it.
 */
async function createItemDB({ table_name, item_name }) {
  console.log(`CREATING ITEM: ${item_name} in table: ${table_name}`); // Log the item creation attempt

  const query = `
      INSERT INTO ${table_name}s(${table_name}_name)
      VALUES ($1)
      ON CONFLICT (${table_name}_name) DO NOTHING
      RETURNING *
      `;

  try {
    // Insert the item into the database, or do nothing if the item already exists (conflict handled)
    const {
      rows: [item],
    } = await client.query(query, [item_name]);

    console.log("CREATED ITEM: " + item_name); // Log successful creation

    // Return the created item data
    return item;
  } catch (error) {
    // Log the error to the database and rethrow it for further handling
    logErrorDB("createItemDB", error);
    throw error;
  }
}

module.exports = createItemDB;
