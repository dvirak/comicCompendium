// ! ----------------- IMPORTED FILES --------------------------
const createAdditionalInfoDB = require("../../DB/DBFunctions/BookDB/helpers/createAdditionalInfoDB");
const { logErrorAPI, MissingInformationErrorAPI } = require("../../Errors/API");
const { formatAdditionalInfo } = require("../bookController/Helpers");
// ! -----------------------------------------------------------

/**
 * Description: Creates additional relations for a book based on the provided relationship data.
 *
 * Request Body:
 * - 'relation_type: item_name" for all relations being added
 * - `relation_type` (string): The type of relation being added (e.g., author, illustrator).
 * - `item_name` (string): The name of the related item (e.g., author name).
 * Note: All relations must be included in the format of relation_type: item_name.
 *
 * @param {Object} req - Express request object containing the book ID in params and relations in body.
 * @param {Object} res - Express response object to send the created relations.
 * @param {Function} next - Express next function for error handling.
 * @returns {Promise<void>} This function does not return anything directly, but sends a response with the created relations.
 * @throws {MissingInformationErrorAPI} If the book ID or relations are missing from the request.
 * @throws {Error} If an unexpected error occurs during the database operation.
 *
 * @precondition The user must be authenticated to create relations for a book.
 * @postcondition A response containing the created relations is sent to the client.
 */
async function createRelationsAPI(req, res, next) {
  console.log("IN createRelationsAPI");
  let relations = req.body;
  let book_id = req.params.book_id;

  try {
    if (!relations || !book_id) {
      throw new MissingInformationErrorAPI(
        "You are missing information needed for this create query. Please double check the information provided."
      );
    }

    let updatedRelation = await createAdditionalInfoDB(book_id, relations);
    let formattedRelation = formatAdditionalInfo(updatedRelation);

    res.status(200).json(formattedRelation);
  } catch (error) {
    logErrorAPI("createRelationsAPI", error, next);
  }
}

module.exports = createRelationsAPI;
