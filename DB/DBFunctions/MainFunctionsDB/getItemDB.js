// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
const {
  logErrorDB,
  MissingInformationErrorDB,
  NotFoundErrorDB,
} = require("../../../Errors/DB");
const { getItemByIdDB, getItemByNameDB } = require("./Helpers");
// ! -----------------------------------------------------------

// ------------GET SPECIFIC ITEM FROM DATABASE------------
/**
 * Retrieves a specific item from a table in the database. Must provide table_name and the item's id or name.
 *
 * @param {number} item_id - The ID of the item being retrieved.
 * @param {string} item_name - The name of the item being retrieved.
 * @returns {Promise<Object>} A promise that resolves to the item object.
 * @throws {Error} If an error occurs while querying the database or if the item is not found.
 *
 * @precondition item_id is provided and is a valid number OR item_name is provided and is a valid string.
 * @postcondition The function returns a Promise that resolves to an object containing the item's data from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getItemDB({ table_name, item_id, item_name }) {
  console.log("IN GET ITEM DB");
  console.log("TABLE NAME: " + table_name);
  console.log("ITEM NAME: " + item_name);
  console.log("ITEM ID: " + item_id);

  try {
    if (!item_id && !item_name) {
      // Throw an error if neither item_id nor item_name is provided
      throw new MissingInformationErrorDB(
        `You are missing the necessary information to retrieve ${
          item_id ? `Item Number: ${item_id}` : `Item Name: ${item_name}`
        } from the ${table_name} table`
      );
    }

    let item;

    if (item_id) {
      // Retrieve item by item_id if provided
      item = await getItemByIdDB(table_name, item_id);
    } else if (item_name) {
      // Retrieve book by item_name if provided
      item = await getItemByNameDB(table_name, item_name);
    }

    if (!item) {
      // Throw an error if the book is not found
      throw new NotFoundErrorDB(
        `Could not find ${
          item_id ? `Item Number: ${item_id}` : `Item Name: ${item_name}`
        } from the ${table_name} table`
      );
    }

    // Return the first row from the fetched rows (item).
    return item;
  } catch (error) {
    // Throw the error for handling by the caller.
    logErrorDB("getItemDB", error);
    throw error;
  }
}

// ------------GET SPECIFIC ITEM FROM DATABASE------------

// Export the function for use by other modules.
module.exports = getItemDB;
