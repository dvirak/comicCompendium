// ! ---------------- IMPORTED MODULES -------------------------
const createItemAPI = require("./createItemAPI");
const deleteItemAPI = require("./deleteItemAPI");
const getAllAPI = require("./getAllAPI");
const getItemAPI = require("./getItemAPI");
const updateItemAPI = require("./updateItemAPI");
// ! -----------------------------------------------------------

/**
 * Exports API functions for item management.
 *
 * This module imports and exports various API functions used for managing items.
 * Each function handles different aspects of item operations including creating,
 * deleting, updating, and retrieving items.
 *
 * @module
 * @exports {Object} An object containing API functions for item management.
 * @property {Function} getItemAPI - Function to retrieve a single item based on ID or name.
 * @property {Function} getAllAPI - Function to retrieve all items from a specified table.
 * @property {Function} createItemAPI - Function to create a new item in a specified table.
 * @property {Function} deleteItemAPI - Function to delete an item from a specified table based on ID.
 * @property {Function} updateItemAPI - Function to update item information in a specified table based on ID.
 */

module.exports = {
  getItemAPI,
  getAllAPI,
  createItemAPI,
  deleteItemAPI,
  updateItemAPI,
};
