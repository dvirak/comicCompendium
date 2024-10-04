// ! ----------------- IMPORTED FILES --------------------------
const {
  logErrorDB,
  MissingInformationErrorDB,
  NotFoundErrorDB,
} = require("../../../Errors/DB"); // Error handling utilities
const { getItemByIdDB, getItemByNameDB } = require("./Helpers"); // Helper functions for retrieving items by ID or name
// ! -----------------------------------------------------------

/**
 * Retrieves a specific item from the specified table in the database. Must provide either the item's ID or name.
 *
 * @param {Object} params - An object containing the parameters for the query.
 * @param {string} params.table_name - The name of the database table to query.
 * @param {number} [params.item_id] - The ID of the item being retrieved.
 * @param {string} [params.item_name] - The name of the item being retrieved.
 * @returns {Promise<Object>} A promise that resolves to the item object.
 * @throws {MissingInformationErrorDB} If neither item_id nor item_name is provided.
 * @throws {NotFoundErrorDB} If the item is not found in the database.
 * @throws {Error} If any other error occurs while querying the database.
 *
 * @precondition Either item_id or item_name is provided and valid.
 * @postcondition The function returns a Promise that resolves to the item's data from the database.
 *                If an error occurs, the function logs and throws it for further handling.
 */
async function getItemDB({ table_name, item_id, item_name }) {
  console.log("IN GET ITEM DB"); // Log the start of the function execution
  console.log("table name: " + table_name);
  console.log("item_id: " + item_id);

  try {
    // Validate that either item_id or item_name is provided
    if (!item_id && !item_name) {
      throw new MissingInformationErrorDB(
        `You are missing the necessary information to retrieve ${
          item_id ? `Item Number: ${item_id}` : `Item Name: ${item_name}`
        } from the ${table_name} table`
      );
    }

    // Retrieve the item either by its ID or name
    let item = item_id
      ? await getItemByIdDB(table_name, item_id)
      : await getItemByNameDB(table_name, item_name);

    // Check if the item exists; if not, throw a not found error
    if (!item) {
      return null;
      // throw new NotFoundErrorDB(
      //   `Could not find ${
      //     item_id ? `Item Number: ${item_id}` : `Item Name: ${item_name}`
      //   } in the ${table_name} table`
      // );
    }

    // Return the fetched item object
    return item;
  } catch (error) {
    // Log the error and rethrow it for further handling
    logErrorDB("getItemDB", error);
    throw error;
  }
}

module.exports = getItemDB;
