// ! ----------------- IMPORTED LIBRARIES --------------------------
const express = require("express");
// ! ---------------------------------------------------------------

// ! ---------------- IMPORTED LOCAL FILES -------------------------
const {
  NotFoundErrorAPI,
  MissingInformationErrorAPI,
  logErrorAPI,
} = require("../../Errors/API");
const { getItemDB } = require("../../DB/DBFunctions/MainFunctionsDB");
// ! ---------------------------------------------------------------

/**
 * Handles GET requests to retrieve a single item based on either item_id or item_name.
 *
 * @param {Object} req - The request object, containing parameters for item_id or query parameters for item_name.
 * @param {Object} res - The response object, used to send back the desired item data or an error message.
 * @param {Function} next - The next middleware function in the request-response cycle.
 */
async function getItemAPI(req, res, next, table_name) {
  console.log("IN GET ITEM API");
  const item_id = req.params.id;
  const item_name = req.query.name ? req.query.name : req.query.title;
  console.log("Table Name = " + table_name);
  console.log("Item Name = " + item_name);
  console.log("Item ID = " + item_id);

  try {
    // Validate input: Ensure either item_id or item_name is provided
    if (!item_id && !item_name) {
      throw new MissingInformationErrorAPI(
        `You are missing the necessary information to retrieve ${
          item_id ? `Item Number: ${item_id}` : `Item Name: ${item_name}`
        } from the ${table_name} table`
      );
    }

    // Call the database function to get the item data based on item_id or item_name
    const item = item_id
      ? await getItemDB({ table_name, item_id })
      : await getItemDB({ table_name, item_name });

    // If item is not found, throw a NotFoundErrorAPI
    if (!item) {
      throw new NotFoundErrorAPI(
        `Could not find ${
          item_id ? `Item Number: ${item_id}` : `Item Name: ${item_name}`
        } from the ${table_name} table`
      );
    }

    // Send the item data as the response
    res.status(200).json(item);
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("getItemAPI", error, next);
  }
}

module.exports = getItemAPI;
