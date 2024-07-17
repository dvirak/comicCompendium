// ! ----------------- IMPORTED FILES --------------------------
const { deleteBookDB } = require("../../DB/DBFunctions/BookDB");
const {
  getBookByIdDB,
} = require("../../DB/DBFunctions/BookDB/GetBooksDB/Helpers");
const { logErrorAPI, BookNotFoundErrorAPI } = require("../../Errors/API");
// ! -----------------------------------------------------------

/**
 * Description: Deletes a book.
 * Method: DELETE
 * Route: /books/:book_id/delete
 * Middleware: requireUser - Ensures user is authenticated.
 * Request Body: Requires password for confirmation.
 * Response: Returns a message indicating the book was deleted.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @throws {Error} If an error occurs while deleting the book.
 *
 * @precondition The user must be authenticated.
 * @postcondition The specified book is deleted if the current user is authorized and logged in.
 */
async function deleteBookAPI(req, res, next) {
  // Convert book_id from params to a number
  let book_to_delete_id = Number(req.params.book_id);

  try {
    // Fetch the book to be deleted
    const bookToDelete = await getBookByIdDB(book_to_delete_id);

    // Check if the book to delete exists
    if (!bookToDelete) {
      throw new BookNotFoundErrorAPI();
    }

    // Delete the book from the database
    const response = await deleteBookDB(book_to_delete_id);

    // Send the response indicating the book was deleted
    res.send({ response });
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("deleteBookAPI", error, next);
  }
}

module.exports = deleteBookAPI;
