// ! ---------------- IMPORTED FILES -------------------------
const {
  CantEditErrorAPI,
  MissingInformationErrorAPI,
} = require("../../../Errors/API");
// ! -----------------------------------------------------------

/**
 * Description: Creates update fields based on book permissions and provided update data.
 *
 * @param {Object} bookToEdit - Book object containing book permissions (e.g., admin status).
 * @param {Object} updateData - Data object containing fields to be updated.
 * @returns {Object} Object containing fields and values that are allowed to be updated.
 * @throws {NotAdminErrorAPI} If book does not have admin permissions and tries to update admin status.
 * @throws {CantEditErrorAPI} If book tries to update restricted fields like id or password.
 * @throws {MissingInformationErrorAPI} If any update data field is empty.
 *
 * @precondition User must have appropriate permissions to update each field in updateData.
 * @postcondition Returns an object with valid update fields and values.
 */

async function createBookUpdateFieldsAPI(bookToEdit, updateData) {
  console.log(bookToEdit);
  console.log(updateData);

  const updateFields = {};

  // Iterate through each key in updateData
  for (const key in updateData) {
    if (key === "id") {
      // Check if book tries to update restricted fields like id or password
      throw new CantEditErrorAPI();
    }

    // Check if updateData has the current key and it's not empty
    if (updateData.hasOwnProperty(key)) {
      if (updateData[key].length === 0) {
        // Throw error if any update data field is empty
        throw new MissingInformationErrorAPI();
      }

      // Check if book has the current key and add it to updateFields
      if (bookToEdit.hasOwnProperty(key)) {
        updateFields[key] = updateData[key];
      }
    }
  }

  // Return object with valid update fields and values
  return updateFields;
}

module.exports = createBookUpdateFieldsAPI;
