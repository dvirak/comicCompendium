const { getUserByIdDB, getUserByUsernameDB } = require("./Helpers");

/**
 * Retrieves a single user from the database based on the provided user_id or username.
 *
 * @param {number} [user_id] - The ID of the user to retrieve.
 * @param {string} [username] - The name of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the user data.
 * @throws {Error} If neither user_id nor username is provided, or if the user is not found.
 */
async function getSingleUserDB(user_id, username) {
  console.log("IN GET SINGLE USER DB");
  console.log("user_id");

  if (!user_id && !username) {
    throw new Error("Either user_id or username must be provided.");
  }

  let user;

  if (user_id) {
    user = await getUserByIdDB(user_id);
  } else if (username) {
    user = await getUserByUsernameDB(username);
  }

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
}

module.exports = { getSingleUserDB };
