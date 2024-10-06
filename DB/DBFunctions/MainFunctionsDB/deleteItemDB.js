// ! ----------------- IMPORTED FILES --------------------------
const { logErrorDB } = require("../../../Errors/DB"); // Error logging utility
const client = require("../../client"); // Database client connection
// ! -----------------------------------------------------------

/**
 * Deletes an item from the specified database table by its ID.
 *
 * @param {Object} deleteData - Object containing the table name and item ID.
 * @param {string} deleteData.table_name - The name of the database table.
 * @param {number} deleteData.item_id - The ID of the item to be deleted.
 * @returns {Object} An object containing the status of the operation, a message, and the deleted item's title.
 * @throws {Error} If an error occurs while deleting the item.
 *
 * @precondition The item_id must correspond to a valid existing item in the database.
 * @postcondition The item with the specified ID is removed from the database, and the deleted item's name is returned.
 */
async function deleteItemDB({ table_name, item_id }) {
  console.log(`deleteItemDB deleting ID#: ${item_id} in ${table_name}s Table`); // Log the deletion attempt

  const query = `
      DELETE FROM ${table_name === "series" ? "serie" : table_name}s
      WHERE id = $1
      RETURNING ${table_name}_name;
      `;

  try {
    // Execute the DELETE query and return the deleted item's name
    const {
      rows: [item],
    } = await client.query(query, [item_id]);

    // Return success status, message, and the deleted item's name
    return {
      status: true,
      name: "ItemDeleted",
      message: "Deletion Success!",
      item,
    };
  } catch (error) {
    // Log the error in the database and throw it for further handling
    logErrorDB("deleteItemDB", error);
    throw error;
  }
}

module.exports = deleteItemDB;
