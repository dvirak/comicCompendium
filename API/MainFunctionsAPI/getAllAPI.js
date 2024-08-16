// ! ---------------- IMPORTED MODULES -------------------------
const logErrorAPI = require("../../Errors/API/logErrorAPI");
const { getAllDB } = require("../../DB/DBFunctions/MainFunctionsDB");
const { MissingInformationErrorAPI } = require("../../Errors/API");
// ! -----------------------------------------------------------

/**
 * Description: API call to Retrieves all items from a specified table.
 * Method: GET
 * Route: /table_name
 *
 * @returns {Promise<void>} This route does not return anything directly, but it sends a response containing basic table information.
 * @throws {Error} If an error occurs while retrieving basic table information from the database.
 *
 * @precondition table_name is provided and is a valid string
 * @postcondition A response containing basic table information is sent to the client.
 */

async function getAllAPI(req, res, next, table_name) {
  console.log("IN GET ALL AUTHORS API");
  console.log("TABLE NAME = " + table_name);

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
