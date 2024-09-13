// Import and re-export database functions
const formatGetBooksByCategoryQueryDB = require("./formatGetBooksByCategoryQueryDB");
const getBookByIdDB = require("./getBookByIdDB");
const getBookByNameDB = require("./getBookByNameDB");

module.exports = {
  getBookByIdDB,
  getBookByNameDB,
  formatGetBooksByCategoryQueryDB,
};
