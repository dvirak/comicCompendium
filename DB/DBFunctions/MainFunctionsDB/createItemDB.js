// ! ----------------- IMPORTED FILES --------------------------
const { logErrorDB } = require("../../../Errors/DB");
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE ITEM DB---------------
/**
 * Creates a new item in the database with the provided item name.
 *
 * @param {Object} itemData - Object containing item data.
 * @param {string} itemData.item_name - The name of the item to create.
 * @returns {Promise<Object>} A promise that resolves to the created item data.
 * @throws {Error} If an error occurs during the item creation process.
 *
 * @precondition itemData is an object containing the item_name.
 * @postcondition The function returns a Promise that resolves to an object containing the created item data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createItemDB({ table_name, item_name }) {
  console.log(`CREATING ITEM: ${item_name} in table: ${table_name}`);

  try {
    // Insert the item into the database, or do nothing if the item already exists
    const {
      rows: [item],
    } = await client.query(
      `
      INSERT INTO ${table_name}s(${table_name}_name)
      VALUES ($1)
      ON CONFLICT (${table_name}_name) DO NOTHING
      RETURNING *
      `,
      [item_name]
    );

    console.log("CREATED ITEM: " + item_name);

    // Return the created item data
    return item;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createItemDB", error);
    throw error;
  }
}
//* -----------------CREATE ITEM DB---------------

// Export the function for use by other modules.
module.exports = createItemDB;
