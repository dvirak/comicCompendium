// ! ----------------- IMPORTED FILES --------------------------
const { logErrorDB, UserNotFoundErrorDB } = require("../../../../../Errors/DB");
const client = require("../../../../client");

// Import the requireUser function from the utils module.
// const { requireUser } = require('/utils');
// ! -----------------------------------------------------------

// ------------GET SINGLE USER BY NAME FROM DATABASE------------
/**
 * Retrieves a single user from the database based on the provided user name.
 *
 * @param {string} username - The name of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 * @throws {Error} If an error occurs while querying the database or if the user is not found.
 *
 * @precondition username is provided and is a valid string.
 * @postcondition The function returns a Promise that resolves to an object containing the user data from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getUserByUsernameDB(username) {
  console.log("IN GET USER BY USERNAME DB");

  // Use ILIKE to perform a case-insensitive search in the database
  const query = `
    SELECT *
    FROM users
    WHERE username ILIKE $1
  `;

  try {
    // Execute the query to select the user from the 'users' table where the title matches the provided username.
    const { rows } = await client.query(query, [username]);

    // If no rows are returned, throw an error indicating the user was not found.
    if (rows.length === 0) {
      throw new UserNotFoundErrorDB();
      // return null;
    }
    console.log("SUCCESS!" + username);
    // Return the first row from the fetched rows (user).
    return rows[0];
  } catch (error) {
    // Log the error for further handling
    logErrorDB("getUserByUsernameDB", error);
    throw error;
  }
}

// ------------GET SINGLE USER BY NAME FROM DATABASE------------

// Export the function for use by other modules.
module.exports = getUserByUsernameDB;
