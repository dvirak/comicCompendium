// ! ----------------- IMPORTED FILES --------------------------
const { deleteAuthorDB } = require("../../DB/DBFunctions/AuthorDB");
const { getAuthorByIdDB } = require("../../DB/DBFunctions/AuthorDB/Helpers");
const { logErrorAPI, NotFoundErrorAPI } = require("../../Errors/API");
// ! -----------------------------------------------------------

/**
 * Description: Deletes a author.
 * Method: DELETE
 * Route: /authors/:author_id/delete
 * Middleware: requireUser - Ensures user is authenticated.
 * Request Body: Requires password for confirmation.
 * Response: Returns a message indicating the author was deleted.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @throws {Error} If an error occurs while deleting the author.
 *
 * @precondition The user must be authenticated.
 * @postcondition The specified author is deleted if the current user is authorized and logged in.
 */
async function deleteAuthorAPI(req, res, next) {
  // Convert author_id from params to a number
  let author_to_delete_id = Number(req.params.author_id);

  try {
    // Fetch the author to be deleted
    const authorToDelete = await getAuthorByIdDB(author_to_delete_id);

    // Check if the author to delete exists
    if (!authorToDelete) {
      throw new NotFoundErrorAPI(
        "The Author you are trying to delete was not found"
      );
    }

    // Delete the author from the database
    const response = await deleteAuthorDB(author_to_delete_id);

    // Send the response indicating the author was deleted
    res.send({ response });
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("deleteAuthorAPI", error, next);
  }
}

module.exports = deleteAuthorAPI;
