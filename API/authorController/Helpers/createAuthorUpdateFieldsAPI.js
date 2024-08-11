// ! ---------------- IMPORTED FILES -------------------------
const {
  getAuthorByNameDB,
} = require("../../../DB/DBFunctions/AuthorDB/Helpers");
const {
  CantEditErrorAPI,
  MissingInformationErrorAPI,
} = require("../../../Errors/API");
// ! -----------------------------------------------------------

/**
 * Description: Creates update fields based on author permissions and provided update data.
 *
 * @param {Object} authorToEdit - Author object containing author_id.
 * @param {Object} updateData - Data object containing fields to be updated.
 * @returns {Object} Object containing fields and values that are allowed to be updated.
 * @throws {NotAdminErrorAPI} If author does not have admin permissions and tries to update admin status.
 * @throws {MissingInformationErrorAPI} If any update data field is empty.
 *
 * @precondition User must have appropriate permissions to update each field in updateData.
 * @postcondition Returns an object with valid update fields and values.
 */

async function createAuthorUpdateFieldsAPI(authorToEdit, updateData) {
  console.log(authorToEdit);
  console.log(updateData);

  const updateFields = {};

  // Iterate through each key in updateData
  for (const key in updateData) {
    // Check if author tries to update restricted fields like id or password
    if (key === "id") {
      throw new CantEditErrorAPI();
    } else if (key === "author_name") {
      let authorNameExistsCheck = await getAuthorByNameDB(
        updateData["author_name"]
      );
      if (authorNameExistsCheck.id !== authorToEdit.id) {
        throw new CantEditErrorAPI(
          "The author you are trying to edit already exists, but has a different ID"
        );
      }
    }

    // Check if updateData has the current key and it's not empty
    if (updateData.hasOwnProperty(key)) {
      if (updateData[key].length === 0) {
        // Throw error if any update data field is empty
        throw new MissingInformationErrorAPI();
      }

      // Check if author has the current key and add it to updateFields
      if (authorToEdit.hasOwnProperty(key)) {
        updateFields[key] = updateData[key];
      }
    }
  }

  // Return object with valid update fields and values
  return updateFields;
}

module.exports = createAuthorUpdateFieldsAPI;
