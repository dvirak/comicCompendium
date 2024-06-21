// ! ----------------- IMPORTED FILES --------------------------
const { logErrorDB } = require("../../../../Errors/DB");
const client = require("../../../client");

// Import the requireUser function from the utils module.
// const { requireUser } = require('/utils');
// ! -----------------------------------------------------------

// -----------------GET ALL USERS FROM DATABASE-----------------
/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<Array>} An array containing all user objects.
 * @throws {Error} If an error occurs while querying the database.
 *
 * @precondition None
 * @postcondition The function returns a Promise that resolves to an array containing all user objects from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getAllUsersDB() {
  console.log("IN GET ALL USERS DB");

  try {
    // Query to select all users from the 'users' table.
    const { rows } = await client.query(`
      SELECT id, username, first_name, last_name, preferred_name, phone, email
      FROM users;
    `);

    // Return the fetched rows (users).
    return rows;
  } catch (error) {
    // Throw the error for handling by the caller.
    logErrorDB("getAllUsersDB", error);
    throw error;
  }
}

// -----------------GET ALL USERS FROM DATABASE-----------------

// Export the function for use by other modules.
module.exports = getAllUsersDB;
