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
 * This function handles the deletion of an item by first checking if the item exists, then deleting it from the database.
 * It requires the user to be authenticated and logs errors for debugging and handling through middleware.
 *
 * Middleware: requireUser - Ensures user is authenticated.
 * Response: Returns a message indicating that the item was successfully deleted.
 *
 * @param {Object} req - Express request object with item ID in req.params.
 * @param {Object} res - Express response object to send a confirmation message upon successful deletion.
 * @param {Function} next - Express next function to pass errors to the error handling middleware.
 * @param {string} table_name - The name of the database table where the item will be deleted.
 *
 * @throws {NotFoundErrorAPI} If the item with the specified ID is not found in the database.
 * @throws {Error} If an unexpected error occurs during the deletion process.
 *
 * @precondition The user must be authenticated.
 * @postcondition If successful, the specified item is deleted from the database and a confirmation message is sent in the response.
 */
async function deleteItemAPI(req, res, next, table_name) {
  // Convert item_id from params to a number
  let item_id = Number(req.params.id);
  console.log(
    `IN deleteItemAPI, deleting ${table_name}#: ${item_id} from the ${table_name} table`
  );

  try {
    // Check if any required fields are missing
    if (!item_id || !table_name) {
      throw new Error(
        !item_id
          ? "You must provide an item_id in deleteItemAPI"
          : "You must provide a table_name in deleteItemAPI"
      );
    }

    // Fetch the item to be deleted
    const itemToDelete = await getItemDB({ table_name, item_id });

    // Check if the item to delete exists
    if (!itemToDelete) {
      throw new NotFoundErrorAPI(
        `Item ID#: ${item_id} was not found in the ${table_name} table.`
      );
    }

    // Delete the item from the database
    const response = await deleteItemDB({ table_name, item_id });

    // Send the response indicating the item was deleted
    res.send({ response });
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("deleteItemAPI", error, next);
  }
}

module.exports = deleteItemAPI;
