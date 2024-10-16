// ! ----------------- IMPORTED FILES --------------------------
const {
  getItemDB,
  deleteItemDB,
} = require("../../DB/DBFunctions/MainFunctionsDB");
const { logErrorAPI, NotFoundErrorAPI } = require("../../Errors/API");
// ! -----------------------------------------------------------

/**
 * Description: Deletes an item from the specified table based on the provided item ID.
 *
 * This function handles deleting an item from the database. It first checks whether the item exists in the specified
 * table and then proceeds with the deletion if found. Any errors encountered during the process are logged for
 * debugging, and error-handling middleware is used to pass them along as necessary.
 *
 * Middleware: requireUser - Ensures that the user is authenticated before deletion is allowed.
 *
 * Request Parameters:
 * - `item_id` (number): The ID of the item to be deleted.
 * - `table_name` (string): The name of the database table from which the item is to be deleted.
 *
 * Response:
 * - Success: Sends a response indicating that the item was successfully deleted from the database.
 * - Failure: Logs and passes errors to error-handling middleware for appropriate responses.
 *
 * @param {Object} req - Express request object containing `item_id` in the request `params`.
 * @param {Object} res - Express response object to send a confirmation message upon successful deletion.
 * @param {Function} next - Express next function to pass errors to the error-handling middleware.
 * @param {string} table_name - The name of the database table where the item will be deleted.
 *
 * @throws {NotFoundErrorAPI} If the item with the specified `item_id` is not found in the database.
 * @throws {Error} If an unexpected error occurs during the deletion process.
 *
 * @precondition The user must be authenticated and authorized to delete items from the specified table.
 * @postcondition If successful, the item is deleted from the database, and a confirmation message is sent to the client.
 */
async function deleteItemAPI(req, res, next, table_name) {
  // Convert item_id from request parameters to a number
  const item_id = Number(req.params.id);
  console.log(
    `IN deleteItemAPI, attempting to delete item with ID#: ${item_id} from the ${table_name} table`
  );

  try {
    // Ensure both item_id and table_name are provided
    if (!item_id || !table_name) {
      throw new Error(
        !item_id
          ? "You must provide an item_id in deleteItemAPI"
          : "You must provide a table_name in deleteItemAPI"
      );
    }

    // Retrieve the item to be deleted from the database
    const itemToDelete = await getItemDB({ table_name, item_id });

    // Check if the item exists in the database
    if (!itemToDelete) {
      throw new NotFoundErrorAPI(
        `Item with ID#: ${item_id} was not found in the ${table_name} table.`
      );
    }

    // Proceed to delete the item from the database
    const response = await deleteItemDB({ table_name, item_id });

    // Send a response confirming the deletion of the item
    res.send({ response });
  } catch (error) {
    // Handle errors and log them for further processing
    logErrorAPI("deleteItemAPI", error, next);
  }
}

module.exports = deleteItemAPI;
