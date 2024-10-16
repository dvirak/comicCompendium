// ! ----------------- IMPORTED FILES --------------------------
const {
  deleteRelationDB,
} = require("../../DB/DBFunctions/RelationFunctionsDB");
const { logErrorAPI } = require("../../Errors/API");
// ! -----------------------------------------------------------

/**
 * Description: Deletes a specified relation from a book in the database based on the provided
 * book ID, item ID, and relation type (e.g., author, illustrator).
 *
 * This function extracts relevant data from the request parameters and query string to delete
 * a relation between a book and another entity in the database. It sends the result of the deletion
 * back to the client in the form of a success message or error.
 *
 * Middleware: None required.
 *
 * Request Parameters:
 * - `book_id` (string): The ID of the book whose relation is being deleted.
 * - `item_id` (string): The ID of the related item to be deleted.
 * - `relation` (string): The type of relation (e.g., "author", "series") to be deleted.
 *
 * Query Parameters:
 * - `title` (string): Optional. The title of the book being processed, used if `book_id` is not provided.
 * - `item_name` (string): Optional. The name of the item being deleted, used if `item_id` is not provided.
 *
 * @param {Object} req - The Express request object containing `book_id`, `item_id`, `relation` in parameters and `title`, `item_name` in the query string.
 * @param {Object} res - The Express response object used to send the result of the deletion.
 * @param {Function} next - The Express next function for passing errors to the error-handling middleware.
 * @returns {Promise<void>} Sends a JSON response with a success message if deletion is successful.
 * @throws {Error} If an error occurs during the deletion process, the error is passed to the error-handling middleware.
 *
 * @precondition The user must be authenticated to delete relations from a book.
 * @postcondition The response contains a success message confirming the relation was deleted, or an error message if the deletion fails.
 */
async function deleteRelationAPI(req, res, next) {
  const book_id = req.params.book_id;
  const item_id = req.params.item_id;
  const relation = req.params.relation;
  const { title, item_name } = req.query;
  console.log("IN deleteRelationAPI");
  console.log(relation);

  try {
    // Call the database function to delete the specified relation
    const deletedItem = await deleteRelationDB(
      book_id,
      item_id,
      relation,
      title,
      item_name
    );

    // Send a success response with the deleted item details
    res.status(200).json(deletedItem);
  } catch (error) {
    // Log and pass the error to the next middleware for handling
    logErrorAPI("deleteRelationAPI", error, next);
  }
}

module.exports = deleteRelationAPI;
