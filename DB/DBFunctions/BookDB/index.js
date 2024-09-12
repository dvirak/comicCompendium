const createBookDB = require("./createBookDB");
const deleteBookDB = require("./deleteBookDB");
const getBooksByCategoryDB = require("./getBooksByCategoryDB");
const processBookInfoDB = require("./processBookInfoDB");
const updateBookDB = require("./updateBookDB");

module.exports = {
  createBookDB,
  updateBookDB,
  deleteBookDB,
  getBooksByCategoryDB,
  processBookInfoDB,
};
