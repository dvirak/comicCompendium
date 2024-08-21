// ! ---------------- IMPORTED FILES -------------------------
const {
  CantEditErrorAPI,
  MissingInformationErrorAPI,
} = require("../../../Errors/API");
// ! -----------------------------------------------------------

/**
 * Description: Creates update fields based on item permissions and provided update data.
 *
 * This function processes the update data to determine which fields can be updated. It checks for restricted fields
 * and ensures that no empty fields are included.
 *
 * @param {Object} itemToEdit - The item object containing item details including permissions.
 * @param {Object} updateData - An object containing fields to be updated and their new values.
 * @returns {Object} An object containing fields and values that are allowed to be updated.
 * @throws {CantEditErrorAPI} If the item tries to update restricted fields like `id`.
 * @throws {MissingInformationErrorAPI} If any field in `updateData` is empty or missing.
 *
 * @precondition User must have appropriate permissions to update each field in `updateData`.
 * @postcondition Returns an object with valid update fields and values that can be updated.
 */
async function createItemUpdateFieldsAPI(itemToEdit, updateData) {
  console.log("IN CREATE ITEM UPDATE FIELDS");
  console.log(itemToEdit);
  console.log(updateData);

  const updateFields = {};

  // Iterate through each key in updateData
  for (const key in updateData) {
    // Check if item tries to update restricted fields like id or password
    if (key === "id") {
      throw new CantEditErrorAPI("You cannot edit an Item's ID");
    }

    // Check if updateData has the current key and it's not empty
    if (updateData.hasOwnProperty(key)) {
      if (updateData[key].length === 0) {
        // Throw error if any update data field is empty
        throw new MissingInformationErrorAPI(
          `Information for ${key} was not provided in updateData`
        );
      }

      // Check if item has the current key and add it to updateFields
      if (itemToEdit.hasOwnProperty(key)) {
        updateFields[key] = updateData[key];
      }
    }
  }

  // Return object with valid update fields and values
  return updateFields;
}

module.exports = createItemUpdateFieldsAPI;
