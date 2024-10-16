const { logErrorDB } = require("../../../Errors/DB");
const createItemDB = require("./createItemDB");
const getItemDB = require("./getItemDB");

/**
 * Description: Checks if an item exists in the specified table by its name;
 * if it does not exist, it creates a new item entry in the database.
 *
 * @param {string} table_name - The name of the table to check for the item.
 * @param {string} item_name - The name of the item to check for existence.
 * @returns {Promise<Object>} The item object from the database after checking or creating.
 * @throws {Error} If an error occurs during the database operations, the error is logged but not re-thrown.
 *
 * @precondition None
 * @postcondition An item entry is either retrieved or created in the specified table.
 */
async function checkOrCreateItemDB(table_name, item_name) {
  console.log("IN CHECK OR CREATE ITEM");

  try {
    let item = await getItemDB({ table_name, item_name });
    if (!item) item = await createItemDB({ table_name, item_name });

    return item;
  } catch (error) {
    logErrorDB("checkOrCreateItemDB", error);
    throw error;
  }
}

module.exports = checkOrCreateItemDB;
