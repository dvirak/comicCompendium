// ! ----------------- IMPORTED FILES --------------------------
const { logErrorDB } = require("../../../Errors/DB");
const client = require("../../client");
// ! -----------------------------------------------------------

// -----------------GET ALL ILLUSTRATORS FROM DATABASE-----------------
/**
 * Retrieves all illustrators from the database.
 *
 * @returns {Promise<Array>} An array containing all book objects.
 * @throws {Error} If an error occurs while querying the database.
 *
 * @precondition None
 * @postcondition The function returns a Promise that resolves to an array containing all book objects from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getAllIllustratorsDB() {
  console.log("IN GET ALL ILLUSTRATORS DB");

  try {
    // Query to select all illustrators from the 'illustrators' table.
    const { rows } = await client.query(`
      SELECT *
      FROM illustrators;
    `);

    // Return the fetched rows (illustrators).
    return rows;
  } catch (error) {
    // Throw the error for handling by the caller.
    logErrorDB("getAllIllustratorsDB", error);
    throw error;
  }
}

// -----------------GET ALL ILLUSTRATORS FROM DATABASE-----------------

// Export the function for use by other modules.
module.exports = getAllIllustratorsDB;
