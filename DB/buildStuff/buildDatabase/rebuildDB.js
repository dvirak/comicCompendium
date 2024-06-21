// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
const { buildAllTables } = require("../buildTables/buildAllTables");
const { dropTables } = require("./dropTables");
const {
  createInitialData,
} = require("../initialData/Functions/createInitialData");
const { logErrorDB } = require("../../../Errors/DB");
// ! -----------------------------------------------------------

//* -------------- REBUILD DATABASE FUNCTION --------------
/**
 * Drops existing tables, creates new tables, and seeds initial data into the database.
 *
 * @returns {Promise<void>} A promise that resolves when the database is successfully rebuilt.
 * @throws {Error} If any error occurs during dropping tables, creating tables, or seeding data.
 *
 * @precondition Database connection must be established.
 * @postcondition The database is rebuilt with fresh tables and initial data.
 */
async function rebuildDB() {
  console.log("STARTING TO REBUILD DB...");

  try {
    // Connect to the database
    await client.connect();

    // Drop existing tables
    await dropTables();

    // Create new tables and seed initial data
    await buildAllTables();
    await createInitialData();

    console.log("FINISHED REBUILDING DB!");
  } catch (error) {
    // Log the error for further handling
    logErrorDB("rebuildDB", error);
    throw error;
  }
}
//* -------------- REBUILD DATABASE FUNCTION --------------

// Export Function
module.exports = {
  rebuildDB,
};
