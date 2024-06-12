const { getUserByIdDB, getUserByUsernameDB } = require("./Helpers");
const { NoUserProvidedError } = require("./Helpers/errors");

/**
 * Retrieves a single user from the database based on the provided user_id or username.
 *
 * @param {number} [user_id] - The ID of the user to retrieve.
 * @param {string} [username] - The name of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the user data.
 * @throws {Error} If neither user_id nor username is provided, or if the user is not found.
 */
async function getSingleUserDB(userData) {
  const { user_id, username } = userData;
  console.log("IN GET SINGLE USER DB");

  if (!user_id && !username) {
    throw new NoUserProvidedError();
  }

  let user;

  if (user_id) {
    user = await getUserByIdDB(user_id);
  } else if (username) {
    user = await getUserByUsernameDB(username);
  }

  return user;
}

module.exports = { getSingleUserDB };
