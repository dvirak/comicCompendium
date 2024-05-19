const client = require("../../client");
const { seedAllTables } = require("../seedTables/seedAllTables");
const { dropTables } = require("./dropTables");
const {
  createInitialUsers,
} = require("../initialData/Functions/createInitialUsers");
const {
  createInitialBooks,
} = require("../initialData/Functions/createInitialBooks");

// Drop tables, create tables, create Initial Data
async function rebuildDB() {
  console.log("STARTING TO REBUILD DB...");

  try {
    client.connect();
    await dropTables();
    await seedAllTables();
    await createInitialUsers();
    await createInitialBooks();

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
