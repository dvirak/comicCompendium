const { logErrorDB } = require("../../../Errors/DB");
const createItemDB = require("./createItemDB");
const getItemDB = require("./getItemDB");

async function checkOrCreateItemDB(table_name, item_id) {
  try {
    let item = await getItemDB(table_name, item_id);
    if (item) return item.id;

    let createItem = await createItemDB(table_name, item_id);
    return createItem.id;
  } catch (error) {
    logErrorDB("checkOrCreateItemDB", error);
  }
}

module.exports = checkOrCreateItemDB;
