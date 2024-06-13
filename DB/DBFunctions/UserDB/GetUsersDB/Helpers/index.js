// Import and re-export database functions
const getUserByIdDB = require("./getUserByIdDB");
const getUserByUsernameDB = require("./getUserByUsernameDB");
const inputCheck = require("./inputCheck");
const comparePasswords = require("./comparePasswords");

module.exports = {
  getUserByIdDB,
  getUserByUsernameDB,
  inputCheck,
  comparePasswords,
};
