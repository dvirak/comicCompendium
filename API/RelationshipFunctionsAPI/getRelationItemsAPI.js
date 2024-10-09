// ! ----------------- IMPORTED FILES --------------------------
const {
  getRelationItemsDB,
} = require("../../DB/DBFunctions/RelationFunctionsDB"); // Function to retrieve related items from the database
const {
  logErrorAPI,
  MissingInformationErrorAPI,
  NotFoundErrorAPI,
} = require("../../Errors/API"); // Error handling and logging functions for API errors
const formatGetRelationItems = require("./helpers/formatGetRelationItems");
// ! -----------------------------------------------------------

/**
 * Description: Retrieves related items for a specific main item based on query parameters.
 *
 * Request Parameters:
 * - `book_id` (string): The ID of the main item for which related items are being retrieved.
 * - `id` (string): Alternative ID parameter if `book_id` is not provided.
 *
 * Query Parameters:
 * - `relation_type` (string): Relation types to be retrieved, specified in the query string.
 *
 * @param {Object} req - Express request object containing the main item ID in `req.params` and relation types in `req.query`.
 * @param {Object} res - Express response object to send the related items or error messages.
 * @param {Function} next - Express next function to pass errors to the error handling middleware.
 * @param {string} table_name - The name of the main item table to retrieve relations for.
 * @returns {Promise<void>} This function does not return anything directly, but sends a response with the retrieved related items or an error message.
 * @throws {MissingInformationErrorAPI} If the necessary information for retrieving relations is missing.
 * @throws {NotFoundErrorAPI} If no related items are found for the specified main item and relation types.
 *
 * @precondition The user must be authenticated to retrieve relations for a main item.
 * @postcondition A response with the related items is sent to the client, or an error message is logged and passed to the next middleware.
 */
async function getRelationItemsAPI(req, res, next, table_name) {
  console.log("IN GETRELATIONSITEMSAPI...."); // Debug log to indicate function execution

  let main_item = table_name; // The table name of the main item
  let main_item_id = req.params.book_id ? req.params.book_id : req.params.id; // The ID of the main item from the request parameters
  let relations = Object.keys(req.query); // Relation types from the query parameters
  console.log(relations);
  try {
    // Check if required information is missing
    if (!main_item || !main_item_id || !relations.length) {
      throw new MissingInformationErrorAPI(
        `You are missing the necessary information to retrieve relations: ${relations.join()} for item number: ${main_item_id} in the table: ${main_item}`
      );
    }

    // Retrieve related items from the database
    const info = await getRelationItemsDB({
      main_item,
      main_item_id,
      relations,
    });

    // If no related items are found, throw a NotFoundErrorAPI
    if (!info) {
      throw new NotFoundErrorAPI(
        `No information was found for relations: ${relations.join()} for item number: ${main_item_id} in the table: ${main_item}`
      );
    }

    let formattedInfo = formatGetRelationItems(info);
    console.log(formattedInfo);

    // Send the related items as the response with status 200
    res.status(200).json(info);
  } catch (error) {
    // Log error and pass it to the next middleware
    logErrorAPI("getRelationItemsAPI", error, next);
  }
}

module.exports = getRelationItemsAPI; // Export the function for use in other modules
