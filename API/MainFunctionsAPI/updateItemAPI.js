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
 * Description: Updates item information based on item_id and request body data.
 *
 * This function handles updating an item in the database. It first retrieves the current item data, validates input,
 * and then applies the updates. It requires the user to be authenticated and logs errors for debugging and handling
 * through middleware.
 *
 * Middleware: requireUser - Ensures user is authenticated.
 * Request Body: The request body must include the data to update the item. The format of the update data depends
 * on the item and the fields that need to be updated.
 * Response: Returns a success message and the updated item data.
 *
 * @param {Object} req - Express request object containing `item_id` in `params` and update data in `body`.
 * @param {Object} res - Express response object to send a success message and updated item data.
 * @param {Function} next - Express next function to pass errors to the error handling middleware.
 * @param {string} table_name - The name of the database table where the item will be updated.
 *
 * @throws {MissingInformationErrorAPI} If the `item_id` or `table_name` is missing in the request.
 * @throws {NotFoundErrorAPI} If the item with the specified `item_id` is not found in the database.
 * @throws {Error} If an unexpected error occurs during the update process.
 *
 * @precondition The user must be authenticated and authorized to update item information.
 * @postcondition On success, the item information is updated in the database, and a success message with the updated item data is sent in the response.
 */

async function updateItemAPI(req, res, next, table_name) {
  const item_id = Number(req.params.id);
  const updateData = req.body;
  console.log("IN UPDATE ITEM API");
  console.log(item_id);

  try {
    if (!item_id || !table_name) {
      throw new MissingInformationErrorAPI(
        !item_id
          ? `You are missing the item_id in updateItemAPI`
          : `You are missing the table_name in updateItemAPI`
      );
    }

    // Retrieve item information to edit from the database
    const itemToEdit = await getItemDB({ table_name, item_id });

    // Check if item exists
    if (!itemToEdit) {
      throw new NotFoundErrorAPI(
        "The item you are trying to update was not found"
      );
    } else {
      // Create update fields based on current item and update data
      const updateFields = await createItemUpdateFieldsAPI(
        itemToEdit,
        updateData
      );

      // Update item information in the database
      let updatedItem = await updateItemDB(table_name, item_id, updateFields);

      // Send success message and updated item data as response
      res.send({ message: "Update successful!", updatedItem });
    }
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("updateItemAPI", error, next);
  }
}

module.exports = updateItemAPI;
