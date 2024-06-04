// Import and re-export database functions
const { getUserByIdDB } = require("./getUserByIdDB");
const { getUserByUsernameDB } = require("./getUserByUsernameDB");

module.exports = { getUserByIdDB, getUserByUsernameDB };
