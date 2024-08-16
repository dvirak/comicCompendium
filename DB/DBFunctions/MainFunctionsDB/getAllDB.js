// ! ----------------- IMPORTED FILES --------------------------
const { MissingInformationErrorDB, logErrorDB } = require("../../../Errors/DB");
const client = require("../../client");
// ! -----------------------------------------------------------

// -----------------GET ALL ITEMS FROM TABLE-----------------
/**
 * Retrieves all authors from the database.
 *
 * @returns {Promise<Array>} An array containing all objects in the specified table.
 * @throws {Error} If an error occurs while querying the database.
 *
 * @precondition table_name is provided and is a valid string
 * @postcondition The function returns a Promise that resolves to an array containing all book objects from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getAllDB({ table_name }) {
  console.log("IN GET ALL DB");
  console.log("TABLE NAME = " + table_name);

  try {
    if (!table_name) {
      throw new MissingInformationErrorDB(
        "Table name was not provided in getAllDB"
      );
    }
    // Query to select all authors from the 'authors' table.
    const { rows } = await client.query(`
      SELECT *
      FROM ${table_name}s;
    `);

    // Return the fetched rows (authors).
    return rows;
  } catch (error) {
    // Throw the error for handling by the caller.
    logErrorDB("getAllDB", error);
    throw error;
  }
}

// -----------------GET ALL AUTHORS FROM DATABASE-----------------

// Export the function for use by other modules.
module.exports = getAllDB;
