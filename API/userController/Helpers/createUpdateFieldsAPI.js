// ! ---------------- IMPORTED FILES -------------------------
const {
  NotAdminErrorAPI,
  CantEditErrorAPI,
  MissingInformationErrorAPI,
} = require("../../../Errors/API");
// ! -----------------------------------------------------------

/**
 * Description: Creates update fields based on user permissions and provided update data.
 *
 * @param {Object} user - User object containing user permissions (e.g., admin status).
 * @param {Object} updateData - Data object containing fields to be updated.
 * @returns {Object} Object containing fields and values that are allowed to be updated.
 * @throws {NotAdminErrorAPI} If user does not have admin permissions and tries to update admin status.
 * @throws {CantEditErrorAPI} If user tries to update restricted fields like id or password.
 * @throws {MissingInformationErrorAPI} If any update data field is empty.
 *
 * @precondition User must have appropriate permissions to update each field in updateData.
 * @postcondition Returns an object with valid update fields and values.
 */

async function createUpdateFieldsAPI(user, updateData) {
  console.log(user);
  console.log(updateData);

  const updateFields = {};

  // Iterate through each key in updateData
  for (const key in updateData) {
    // Check if user is not an admin and tries to update admin status
    if (key === "admin" && !user.admin) {
      throw new NotAdminErrorAPI();
    } else if (key === "id" || key === "password") {
      // Check if user tries to update restricted fields like id or password
      throw new CantEditErrorAPI();
    }

    // Check if updateData has the current key and it's not empty
    if (updateData.hasOwnProperty(key)) {
      if (updateData[key].length === 0) {
        // Throw error if any update data field is empty
        throw new MissingInformationErrorAPI();
      }

      // Check if user has the current key and add it to updateFields
      if (user.hasOwnProperty(key)) {
        updateFields[key] = updateData[key];
      }
    }
  }

  // Return object with valid update fields and values
  return updateFields;
}

module.exports = createUpdateFieldsAPI;
