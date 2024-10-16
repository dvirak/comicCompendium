// ! ----------------- IMPORTED FILES --------------------------
const { deleteBookDB } = require("../../DB/DBFunctions/BookDB");
const {
  getBookByIdDB,
} = require("../../DB/DBFunctions/BookDB/GetBooksDB/Helpers");
const { logErrorAPI, BookNotFoundErrorAPI } = require("../../Errors/API");
// ! -----------------------------------------------------------

/**
 * Description: Deletes a book based on the provided book ID.
 *
 * This function checks for the existence of the book before attempting to delete it.
 *
 * Middleware: None required.
 * Request Body: None required for this operation.
 *
 * @param {Object} req - The request object containing the book ID in `params`.
 * @param {Object} res - The response object to send the deletion confirmation.
 * @param {Function} next - The next middleware function for error handling.
 * @returns {Promise<void>} This function does not return anything directly, but it sends a response indicating the deletion status.
 * @throws {BookNotFoundErrorAPI} If the book with the specified ID is not found.
 * @throws {Error} If an error occurs while deleting the book from the database.
 *
 * @precondition The user must be authenticated to delete a book.
 * @postcondition If successful, the specified book is deleted from the database, and a confirmation message is sent in the response.
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
