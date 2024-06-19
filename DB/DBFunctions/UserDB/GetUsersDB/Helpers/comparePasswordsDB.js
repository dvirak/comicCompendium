// helpers/passwordUtils.js
const bcrypt = require("bcrypt");

/**
 * Compares a plain password with a hashed password.
 *
 * @param {string} plainPassword - The plain password to compare.
 * @param {string} hashedPassword - The hashed password to compare with.
 * @returns {boolean} True if the passwords match, otherwise false.
 */
async function comparePasswordsDB(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = comparePasswordsDB;
