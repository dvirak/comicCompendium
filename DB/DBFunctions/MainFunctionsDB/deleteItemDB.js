// ! ----------------- IMPORTED FILES --------------------------
const { logErrorDB } = require("../../../Errors/DB");
const client = require("../../client");
// ! -----------------------------------------------------------

/**
 * Description: Deletes an item from the database.
 *
 * @param {number} item_id - The ID of the item to be deleted.
 * @returns {Object} An object containing the status of the operation, a message, and the deleted item's title.
 * @throws {Error} If an error occurs while deleting the item.
 *
 * @precondition The item_id must be a valid existing item ID in the database.
 * @postcondition The item with the specified ID is deleted from the database.
 */
async function deleteItemDB({ table_name, item_id }) {
  console.log(`deleteItemDB deleting ID#: ${item_id} in ${table_name}s Table}`);
  try {
    // Perform the database query to delete the item
    const {
      rows: [item],
    } = await client.query(
      `
      DELETE FROM ${table_name}s
      WHERE id = $1
      RETURNING ${table_name}_name;
    `,
      [item_id]
    );

    // Return success status and the deleted item's name
    return {
      status: true,
      name: "ItemDeleted",
      message: "Deletion Success!",
      item,
    };
  } catch (error) {
    // Log any errors that occur and throw them for the caller to handle
    logErrorDB("deleteItemDB", error);
    throw error;
  }
}

module.exports = deleteItemDB;
