// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const router = express.Router();
// ! -----------------------------------------------------------

// ! ---------------- IMPORTED MODULES -------------------------
const {
  getBookByIdDB,
} = require("../../DB/DBFunctions/BookDB/GetBooksDB/Helpers");
const { updateBookDB } = require("../../DB/DBFunctions/BookDB/");
const {
  logErrorAPI,
  BookNotFoundErrorAPI,
  NotAuthorizedErrorAPI,
} = require("../../Errors/API");
const createBookUpdateFieldsAPI = require("./Helpers/createUpdateFieldsAPI");
// ! -----------------------------------------------------------

/**
 * Description: Update book information based on book_id and request body data.
 * Method: PUT
 * Route: /books/:book_id
 *
 * @param {Object} req - Express request object containing book_id in params and update data in body.
 * @param {Object} res - Express response object to send success message and updated book data.
 * @param {Function} next - Express next function to pass control to the next middleware.
 * @returns {Promise<void>} This route does not return anything directly, but it sends a response with a success message and updated book data.
 * @throws {BookNotFoundErrorAPI} If the book with specified book_id is not found in the database.
 * @throws {NotAuthorizedErrorAPI} If the current book is not authorized to update the book information (either not matching book_id or not an admin).
 * @throws {Error} If an error occurs while updating book information in the database.
 *
 * @precondition The book must be authenticated and authorized to update book information.
 * @postcondition Book information is updated in the database and a success message with updated book data is sent to the client.
 */

async function updateBookAPI(req, res, next) {
  const { book_id } = Number(req.params.book_id);
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
      const updatedBook = await updateBookDB(book_id, updateFields);

      // Send success message and updated book data as response
      res.send({ message: "Update successful!", updatedBook });
    }
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("updateBookAPI", error, next);
  }
}

module.exports = updateBookAPI;
