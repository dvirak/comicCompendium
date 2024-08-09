const { createAuthorDB } = require("./createAuthorDB");
const deleteAuthorDB = require("./deleteAuthorDB");
const getAllAuthorsDB = require("./getAllAuthorsDB");
const getAuthorDB = require("./getAuthorDB");

module.exports = {
  createAuthorDB,
  getAllAuthorsDB,
  getAuthorDB,
  deleteAuthorDB,
};
