// ! ---------------- IMPORTED MODULES -------------------------
const logErrorAPI = require("../../Errors/API/logErrorAPI");
const { getAllDB } = require("../../DB/DBFunctions/MainFunctionsDB");
const { MissingInformationErrorAPI } = require("../../Errors/API");
// ! -----------------------------------------------------------

/**
 * Description: Retrieves all items from a specified table.
 *
 * This function fetches all items from the specified table in the database. It checks if the table name is provided and handles errors through API error handling middleware.
 *
 * Middleware: None required.
 * Request Body: None required.
 * Response: Sends a JSON response containing all items from the specified table.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object to send the list of items.
 * @param {Function} next - Express next function to pass errors to the error handling middleware.
 * @param {string} table_name - The name of the database table from which to retrieve the items.
 *
 * @throws {MissingInformationErrorAPI} If the table name is not provided.
 * @throws {Error} If an unexpected error occurs while retrieving items from the database.
 *
 * @precondition The `table_name` parameter must be provided and must be a valid string.
 * @postcondition A response containing the list of items from the specified table is sent to the client.
 */
async function getAllAPI(req, res, next, table_name) {
  console.log("IN GET ALL AUTHORS API");

  try {
    if (!table_name) {
      throw new MissingInformationErrorAPI(
        "Table name was not provided for getAllAPI"
      );
    }
    // Calls the database function to get all items
    const items = await getAllDB({ table_name });

    // Send list of items as the response
    res.status(200).json(items);
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("getAllAPI", error, next);
  }
}

module.exports = getAllAPI;
