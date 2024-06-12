// Import and re-export database functions
const getUserByIdDB = require("./getUserByIdDB");
const getUserByUsernameDB = require("./getUserByUsernameDB");
const inputCheck = require("./inputCheck");

module.exports = { getUserByIdDB, getUserByUsernameDB, inputCheck };
