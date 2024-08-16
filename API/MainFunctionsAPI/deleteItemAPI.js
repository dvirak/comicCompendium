// ! ----------------- IMPORTED FILES --------------------------
const {
  getItemDB,
  deleteItemDB,
} = require("../../DB/DBFunctions/MainFunctionsDB");
const { logErrorAPI, NotFoundErrorAPI } = require("../../Errors/API");
// ! -----------------------------------------------------------

/**
 * Description: Deletes a item.
 * Method: DELETE
 * Route: /items/:item_id/delete
 * Middleware: requireUser - Ensures user is authenticated.
 * Request Body: Requires password for confirmation.
 * Response: Returns a message indicating the item was deleted.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @throws {Error} If an error occurs while deleting the item.
 *
 * @precondition The user must be authenticated.
 * @postcondition The specified item is deleted if the current user is authorized and logged in.
 */
async function deleteItemAPI(req, res, next, table_name) {
  // Convert item_id from params to a number
  let item_id = Number(req.params.id);
  console.log(
    `IN deleteItemAPI, deleting ${table_name}#: ${item_id} from the ${table_name} table`
  );

  try {
    if (!item_id || !table_name) {
      !item_id
        ? "You must provide an item_id in deleteItemAPI"
        : "You must provide a table_name in deleteItemAPI";
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
