// ! ---------------- IMPORTED MODULES -------------------------
const getItemByIdDB = require("./getItemByIdDB");
const getItemByNameDB = require("./getItemByNameDB");
// ! -----------------------------------------------------------

/**
 * Exports database functions for retrieving items.
 *
 * This module imports and exports functions used for retrieving items from the database
 * based on either ID or name. These functions interact directly with the database
 * to fetch the desired item data.
 *
 * @module
 * @exports {Object} An object containing database functions for item retrieval.
 * @property {Function} getItemByIdDB - Function to retrieve an item from the database using its ID.
 * @property {Function} getItemByNameDB - Function to retrieve an item from the database using its name.
 */

module.exports = { getItemByIdDB, getItemByNameDB };
