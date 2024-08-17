// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const router = express.Router();
// ! -----------------------------------------------------------

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
 * Method: PATCH
 * Route: /items/:item_id/update
 *
 * @param {Object} req - Express request object containing item_id in params and update data in body.
 * @param {Object} res - Express response object to send success message and updated item data.
 * @param {Function} next - Express next function to pass control to the next middleware.
 * @returns {Promise<void>} This route does not return anything directly, but it sends a response with a success message and updated item data.
 * @throws {NotFoundErrorAPI} If the item with the specified item_id is not found in the database.
 * @throws {Error} If an error occurs while updating item information in the database.
 *
 * @precondition The user must be authenticated and authorized to update item information.
 * @postcondition Item information is updated in the database and a success message with updated item data is sent to the client.
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
