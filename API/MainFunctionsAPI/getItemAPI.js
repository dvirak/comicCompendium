// ! ---------------- IMPORTED LOCAL FILES -------------------------
const {
  NotFoundErrorAPI,
  MissingInformationErrorAPI,
  logErrorAPI,
  errorCodeCheck,
} = require("../../Errors/API");
const { getItemDB } = require("../../DB/DBFunctions/MainFunctionsDB");
// ! ---------------------------------------------------------------

/**
 * Description: Handles GET requests to retrieve a single item based on either item_id or item_name.
 *
 * This function retrieves an item from a specified table based on the item ID or name provided in the request. It validates input and handles errors through API error handling middleware.
 *
 * Middleware: None required.
 * Request Parameters:
 * - `item_id` (in URL params) or
 * - `item_name` (in query params, can also be `title`)
 * Response: Sends the requested item data or an error message if the item is not found.
 *
 * @param {Object} req - The request object, containing `params.id` for item ID or query parameters for item name.
 * @param {Object} res - The response object used to send back the item data or error message.
 * @param {Function} next - The next middleware function to pass errors to the error handling middleware.
 * @param {string} table_name - The name of the database table from which to retrieve the item.
 *
 * @throws {MissingInformationErrorAPI} If neither item ID nor item name is provided in the request.
 * @throws {NotFoundErrorAPI} If the item with the specified ID or name is not found in the database.
 * @throws {Error} If an unexpected error occurs during the item retrieval process.
 *
 * @precondition The request must include either `item_id` or `item_name` (or `title`).
 * @postcondition A response with the requested item data is sent to the client, or an error message is sent if the item is not found.
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
    throw error;
  }
}

module.exports = getItemAPI;
