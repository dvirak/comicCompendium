// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../../../client");

// Import the requireUser function from the utils module.
// const { requireUser } = require('/utils');
// ! -----------------------------------------------------------

// ------------GET SINGLE USER BY NAME FROM DATABASE------------
/**
 * Retrieves a single user from the database based on the provided user name.
 *
 * @param {string} user_name - The name of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 * @throws {Error} If an error occurs while querying the database or if the user is not found.
 *
 * @precondition user_name is provided and is a valid string.
 * @postcondition The function returns a Promise that resolves to an object containing the user data from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getUserByUsernameDB(user_name) {
  console.log("IN GET USER BY NAME DB");

  const query = `
    SELECT id, username, first_name, last_name, preferred_name, phone, email, admin
    FROM users
    WHERE title = $1
  `;

  try {
    // Execute the query to select the user from the 'users' table where the title matches the provided user_name.
    const { rows } = await client.query(query, [user_name]);

    // If no rows are returned, throw an error indicating the user was not found.
    if (rows.length === 0) {
      throw new Error("User not found.");
    }

    // Return the first row from the fetched rows (user).
    return rows[0];
  } catch (err) {
    console.log(`Error occurred in GET USER BY NAME DB: ${err}`);
    // Throw the error for handling by the caller.
    throw err;
  }
}

// ------------GET SINGLE USER BY NAME FROM DATABASE------------

// Export the function for use by other modules.
module.exports = { getUserByUsernameDB };
