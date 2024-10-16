// ! ---------------- IMPORTED MODULES -------------------------
const {
  logErrorAPI,
  NotFoundErrorAPI,
  MissingInformationErrorAPI,
} = require("../../Errors/API");
const {
  getItemDB,
  updateItemDB,
} = require("../../DB/DBFunctions/MainFunctionsDB");
const { createItemUpdateFieldsAPI } = require("./Helpers");
// ! -----------------------------------------------------------

/**
 * Description: Updates an existing item in the database based on the provided `item_id` and request body data.
 *
 * This function handles retrieving the current item data from the database, validating the input, and applying the
 * requested updates. It requires the user to be authenticated, and logs any errors for debugging and middleware handling.
 *
 * Middleware: requireUser - Ensures that the user is authenticated before proceeding.
 *
 * Request Body:
 * - The request body should contain the fields that need to be updated for the item.
 * - The specific fields to be updated depend on the item and the `table_name` where the item is stored.
 *
 * Request Parameters:
 * - `item_id` (number): The ID of the item to be updated.
 * - `table_name` (string): The name of the database table where the item is stored.
 *
 * Response:
 * - Success: Returns a JSON response containing a success message and the updated item data.
 * - Failure: Logs the error and passes it to the error-handling middleware for response.
 *
 * @param {Object} req - Express request object containing `item_id` in `params` and update data in `body`.
 * @param {Object} res - Express response object used to send the result of the update operation.
 * @param {Function} next - Express next function for passing errors to the error-handling middleware.
 * @param {string} table_name - The name of the database table where the item will be updated.
 *
 * @throws {MissingInformationErrorAPI} If the `item_id` or `table_name` is missing from the request.
 * @throws {NotFoundErrorAPI} If the item with the specified `item_id` is not found in the database.
 * @throws {Error} If an unexpected error occurs during the update process.
 *
 * @precondition The user must be authenticated and authorized to update item information.
 * @postcondition On success, the item information is updated in the database, and a response is sent containing a success message and the updated item data.
 */
async function updateItemAPI(req, res, next, table_name) {
  const item_id = Number(req.params.id); // Retrieve the item_id from request parameters
  const updateData = req.body; // Retrieve the update data from request body
  console.log("IN UPDATE ITEM API");

  try {
    // Check if both item_id and table_name are provided
    if (!item_id || !table_name) {
      throw new MissingInformationErrorAPI(
        !item_id
          ? `You are missing the item_id in updateItemAPI`
          : `You are missing the table_name in updateItemAPI`
      );
    }

    // Retrieve the existing item from the database
    const itemToEdit = await getItemDB({ table_name, item_id });

    // Check if the item exists
    if (!itemToEdit) {
      throw new NotFoundErrorAPI(
        "The item you are trying to update was not found"
      );
    } else {
      // Generate the fields to update based on the existing item and the new data
      const updateFields = await createItemUpdateFieldsAPI(
        itemToEdit,
        updateData
      );

      // Update the item in the database
      const updatedItem = await updateItemDB(table_name, item_id, updateFields);

      // Send a success message along with the updated item data
      res.send({ message: "Update successful!", updatedItem });
    }
  } catch (error) {
    // Log the error and pass it to the next middleware
    logErrorAPI("updateItemAPI", error, next);
  }
}

module.exports = updateItemAPI;
