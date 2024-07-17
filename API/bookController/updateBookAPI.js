// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const router = express.Router();
// ! -----------------------------------------------------------

// ! ---------------- IMPORTED MODULES -------------------------
const {
  getBookByIdDB,
} = require("../../DB/DBFunctions/BookDB/GetBooksDB/Helpers");
const { updateBookDB } = require("../../DB/DBFunctions/BookDB/");
const { logErrorAPI, BookNotFoundErrorAPI } = require("../../Errors/API");
const {
  createBookUpdateFieldsAPI,
  formatBookPublishDatesAPI,
} = require("./Helpers");
// ! -----------------------------------------------------------

/**
 * Description: Updates book information based on book_id and request body data.
 * Method: PATCH
 * Route: /books/:book_id/update
 *
 * @param {Object} req - Express request object containing book_id in params and update data in body.
 * @param {Object} res - Express response object to send success message and updated book data.
 * @param {Function} next - Express next function to pass control to the next middleware.
 * @returns {Promise<void>} This route does not return anything directly, but it sends a response with a success message and updated book data.
 * @throws {BookNotFoundErrorAPI} If the book with the specified book_id is not found in the database.
 * @throws {Error} If an error occurs while updating book information in the database.
 *
 * @precondition The user must be authenticated and authorized to update book information.
 * @postcondition Book information is updated in the database and a success message with updated book data is sent to the client.
 */
async function updateBookAPI(req, res, next) {
  const book_id = Number(req.params.book_id);
  const updateData = req.body;

  try {
    // Retrieve book information to edit from the database
    const bookToEdit = await getBookByIdDB(book_id);

    // Check if book exists
    if (!bookToEdit) {
      throw new BookNotFoundErrorAPI();
    } else {
      // Create update fields based on current book and update data
      const updateFields = await createBookUpdateFieldsAPI(
        bookToEdit,
        updateData
      );

      // Update book information in the database
      let updatedBook = await updateBookDB(book_id, updateFields);

      // Ensure publish_date is properly formatted for return
      updatedBook = formatBookPublishDatesAPI(updatedBook);

      // Send success message and updated book data as response
      res.send({ message: "Update successful!", updatedBook });
    }
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("updateBookAPI", error, next);
  }
}

module.exports = updateBookAPI;
