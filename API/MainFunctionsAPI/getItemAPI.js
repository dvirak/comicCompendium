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
 * Handles GET requests to retrieve a single author based on either author_id or author_name.
 *
 * @param {Object} req - The request object, containing parameters for author_id or query parameters for author_name.
 * @param {Object} res - The response object, used to send back the desired author data or an error message.
 * @param {Function} next - The next middleware function in the request-response cycle.
 */
async function getItemAPI(req, res, next, table_name) {
  console.log("IN GET ITEM API");
  const author_id = req.params.author_id;
  const author_name = req.query.author_name;

  try {
    // Validate input: Ensure either author_id or author_name is provided
    if (!author_id && !author_name) {
      throw new MissingInformationErrorAPI(
        `You are missing the necessary information to retrieve ${
          item_id ? `Item Number: ${item_id}` : `Item Name: ${item_name}`
        } from the ${table_name} table`
      );
    }

    // Call the database function to get the author data based on author_id or author_name
    const author = author_id
      ? await getItemDB({ author_id })
      : await getItemDB({ author_name });

    // If author is not found, throw a NotFoundErrorAPI
    if (!author) {
      throw new NotFoundErrorAPI(
        `Could not find ${
          item_id ? `Item Number: ${item_id}` : `Item Name: ${item_name}`
        } from the ${table_name} table`
      );
    }

    // Send the author data as the response
    res.status(200).json(author);
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("getItemAPI", error, next);
  }
}

module.exports = getItemAPI;
