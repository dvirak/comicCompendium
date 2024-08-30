const createBookDB = require("./createBookDB");
const deleteBookDB = require("./deleteBookDB");
const getBooksByCategoryDB = require("./getBooksByCategoryDB");
const updateBookDB = require("./updateBookDB");

module.exports = {
  createBookDB,
  updateBookDB,
  deleteBookDB,
  getBooksByCategoryDB,
};
