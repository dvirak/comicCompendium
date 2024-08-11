const { createAuthorDB } = require("./createAuthorDB");
const deleteAuthorDB = require("./deleteAuthorDB");
const getAllAuthorsDB = require("./getAllAuthorsDB");
const getAuthorDB = require("./getAuthorDB");
const updateAuthorDB = require("./updateAuthorDB");

module.exports = {
  createAuthorDB,
  getAllAuthorsDB,
  getAuthorDB,
  deleteAuthorDB,
  updateAuthorDB,
};
