const client = require("../../client");
const { seedAllTables } = require("../buildTables/buildAllTables");
const { dropTables } = require("./dropTables");
const {
  createInitialData,
} = require("../initialData/Functions/createInitialData");

// Drop tables, create tables, create Initial Data
async function rebuildDB() {
  console.log("STARTING TO REBUILD DB...");

  try {
    client.connect();
    await dropTables();
    await seedAllTables();
    await createInitialData();

    console.log("FINISHED REBUILDING DB!");
  } catch (error) {
    console.log("ERROR IN REBUILD DB: " + error);
    throw error;
  }
}

// Export Function
module.exports = {
  rebuildDB,
};
