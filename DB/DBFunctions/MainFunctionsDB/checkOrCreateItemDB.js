const { logErrorDB } = require("../../../Errors/DB");
const createItemDB = require("./createItemDB");
const getItemDB = require("./getItemDB");

async function checkOrCreateItemDB(table_name, item_name) {
  console.log("IN CHECK OR CREATE ITEM");
  console.log(table_name);
  console.log(item_name);
  try {
    let item = await getItemDB({ table_name, item_name });
    if (!item) item = await createItemDB({ table_name, item_name });

    return item;
  } catch (error) {
    logErrorDB("checkOrCreateItemDB", error);
  }
}

module.exports = checkOrCreateItemDB;
