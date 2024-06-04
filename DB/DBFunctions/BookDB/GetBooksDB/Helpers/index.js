// Import and re-export database functions
const { getBookByIdDB } = require("./getBookByIdDB");
const { getBookByNameDB } = require("./getBookByNameDB");

module.exports = { getBookByIdDB, getBookByNameDB };
