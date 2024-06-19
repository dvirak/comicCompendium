// Import and re-export database functions
const getUserByIdDB = require("./getUserByIdDB");
const getUserByUsernameDB = require("./getUserByUsernameDB");
const inputCheckDB = require("./inputCheckDB");
const comparePasswordsDB = require("./comparePasswordsDB");

module.exports = {
  getUserByIdDB,
  getUserByUsernameDB,
  inputCheckDB,
  comparePasswordsDB,
};
