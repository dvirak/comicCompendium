// ! ---------------- IMPORTED MODULES -------------------------
const createItemDB = require("./createItemDB");
const deleteItemDB = require("./deleteItemDB");
const getAllDB = require("./getAllDB");
const getItemDB = require("./getItemDB");
const updateItemDB = require("./updateItemDB");
// ! -----------------------------------------------------------

/**
 * Exports database functions for item management.
 *
 * This module imports and exports functions for managing items in the database, including
 * creation, retrieval, update, and deletion. These functions handle various database
 * operations related to items.
 *
 * @module
 * @exports {Object} An object containing database functions for item management.
 * @property {Function} createItemDB - Function to create a new item in the database.
 * @property {Function} deleteItemDB - Function to delete an existing item from the database.
 * @property {Function} getAllDB - Function to retrieve all items from a specified table in the database.
 * @property {Function} getItemDB - Function to retrieve a specific item from the database.
 * @property {Function} updateItemDB - Function to update an existing item in the database.
 */

module.exports = {
  getItemDB,
  getAllDB,
  createItemDB,
  deleteItemDB,
  updateItemDB,
};
