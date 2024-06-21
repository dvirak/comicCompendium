//! Imported Files --------------------------
const client = require("../../client");
const { logErrorDB } = require("../../../Errors/DB");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;
//! ---------------------------------------------

//* --------------CREATE USER DB-------------
/**
 * Creates a new user in the database.
 *
 * @param {Object} userData - Object containing user data.
 * @param {string} userData.username - The username of the new user.
 * @param {string} userData.password - The password of the new user.
 * @param {string} userData.first_name - The first name of the new user.
 * @param {string} userData.last_name - The last name of the new user.
 * @param {string} userData.preferred_name - The preferred name of the new user.
 * @param {string} userData.phone - The phone number of the new user.
 * @param {string} userData.email - The email address of the new user.
 * @param {boolean} [userData.admin=false] - Optional admin status of the new user.
 * @returns {Promise<Object>} A promise that resolves to the user data inserted into the database.
 * @throws {Error} If there's an error during the database operation.
 *
 * @precondition userData must contain username, password, first_name, last_name, preferred_name, phone, and email fields.
 * @postcondition The function inserts a new user into the database and returns the user object.
 */
async function createUserDB({
  username,
  password,
  first_name,
  last_name,
  preferred_name,
  phone,
  email,
  admin = false,
}) {
  // Ensure admin is a boolean and defaults to false unless explicitly sent as true
  admin !== true ? (admin = false) : (admin = admin);

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    // Insert user data into the database
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, first_name, last_name, preferred_name, phone, email, admin) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, COALESCE($8, false))
      ON CONFLICT (username) DO NOTHING 
      RETURNING *
      `,
      [
        username,
        hashedPassword,
        first_name,
        last_name,
        preferred_name,
        phone,
        email,
        admin,
      ]
    );

    return user;
  } catch (error) {
    // Log and rethrow the error
    logErrorDB("createUserDB", error);
    throw error;
  }
}
//* --------------CREATE USER DB-------------

module.exports = createUserDB;
