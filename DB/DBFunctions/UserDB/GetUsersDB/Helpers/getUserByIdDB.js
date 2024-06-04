// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../../../client");

// Import the requireUser function from the utils module.
// const { requireUser } = require('/utils');
// ! -----------------------------------------------------------

// ------------GET SINGLE USER BY ID FROM DATABASE------------
/**
 * Retrieves a single user from the database based on the provided user ID.
 *
 * @param {number} user_id - The ID of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 * @throws {Error} If an error occurs while querying the database or if the user is not found.
 *
 * @precondition user_id is provided and is a valid number.
 * @postcondition The function returns a Promise that resolves to an object containing the user data from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getUserByIdDB(user_id) {
  console.log("IN GET USER BY ID DB");

  const query = `
    SELECT id, username, first_name, last_name, preferred_name, phone, email, admin
    FROM users
    WHERE id = $1
  `;

  try {
    // Execute the query to select the user from the 'users' table where the ID matches the provided user_id.
    const { rows } = await client.query(query, [user_id]);

    // If no rows are returned, throw an error indicating the user was not found.
    if (rows.length === 0) {
      throw new Error("User not found.");
    }

    // Return the first row from the fetched rows (user).
    return rows[0];
  } catch (err) {
    console.log(`Error occurred in GET USER BY ID DB: ${err}`);
    // Throw the error for handling by the caller.
    throw err;
  }
}

// ------------GET SINGLE USER BY ID FROM DATABASE------------

// Export the function for use by other modules.
module.exports = { getUserByIdDB };
