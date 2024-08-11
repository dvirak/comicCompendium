// ! ----------------- IMPORTED FILES --------------------------
const { logErrorDB } = require("../../../Errors/DB");
const client = require("../../client");
// ! -----------------------------------------------------------

/**
 * Description: Deletes a illustrator from the database.
 *
 * @param {number} illustrator_id - The ID of the illustrator to be deleted.
 * @returns {Object} An object containing the status of the operation, a message, and the deleted illustrator's title.
 * @throws {Error} If an error occurs while deleting the illustrator.
 *
 * @precondition The illustrator_id must be a valid existing illustrator ID in the database.
 * @postcondition The illustrator with the specified ID is deleted from the database.
 */
async function deleteIllustratorDB(illustrator_id) {
  try {
    // Perform the database query to delete the illustrator
    const {
      rows: [illustrator],
    } = await client.query(
      `
      DELETE FROM illustrators
      WHERE id = $1
      RETURNING illustrator_name;
    `,
      [illustrator_id]
    );

    // Return success status and the deleted illustrator's name
    return {
      status: true,
      name: "IllustratorDeleted",
      message: "Deletion Success!",
      illustrator,
    };
  } catch (error) {
    // Log any errors that occur and throw them for the caller to handle
    logErrorDB("deleteIllustratorDB", error);
    throw error;
  }
}

module.exports = deleteIllustratorDB;
