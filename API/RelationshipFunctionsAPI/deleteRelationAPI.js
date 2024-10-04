// ! ----------------- IMPORTED FILES --------------------------
const {
  deleteRelationDB,
} = require("../../DB/DBFunctions/RelationFunctionsDB");
const { logErrorAPI } = require("../../Errors/API");
// ! -----------------------------------------------------------

/**
 * Description: Deletes a specified relation from a book based on the provided book ID, item ID, and relation type.
 *
 * Request Parameters:
 * - `book_id` (string): The ID of the book from which the relation is being deleted.
 * - `item_id` (string): The ID of the related item to be deleted.
 * - `relation` (string): The type of relation to be deleted (e.g., author, illustrator).
 *
 * Query Parameters:
 * - `title` (string): Optional title of the item being deleted.
 * - `item_name` (string): Optional name of the item being deleted.
 *
 * @param {Object} req - Express request object containing parameters and query data for the relation deletion.
 * @param {Object} res - Express response object to send the result of the deletion.
 * @param {Function} next - Express next function for error handling.
 * @returns {Promise<void>} This function does not return anything directly, but sends a response with the deleted item data.
 * @throws {Error} If an error occurs while deleting the relation from the database.
 *
 * @precondition The user must be authenticated to delete relations for a book.
 * @postcondition A response confirming the deletion of the relation is sent to the client.
 */
async function deleteRelationAPI(req, res, next) {
  const book_id = req.params.book_id;
  const item_id = req.params.item_id;
  const relation = req.params.relation;
  const { title, item_name } = req.query;
  console.log("IN deleteRelationAPI");
  console.log(relation);

  try {
    const deletedItem = await deleteRelationDB(
      book_id,
      item_id,
      relation,
      title,
      item_name
    );

    res.status(200).json(deletedItem);
  } catch (error) {
    logErrorAPI("deleteRelationAPI", error, next);
  }
}

module.exports = deleteRelationAPI;
