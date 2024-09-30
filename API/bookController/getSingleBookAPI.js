// ! ----------------- IMPORTED LIBRARIES --------------------------
const express = require("express");
// ! ---------------- IMPORTED LOCAL MODULES -------------------------
const {
  InputErrorBooksAPI,
  logErrorAPI,
  BookNotFoundErrorAPI,
} = require("../../Errors/API");
const { getSingleBookDB } = require("../../DB/DBFunctions/BookDB/GetBooksDB/");
const {
  formatBookPublishDatesAPI,
  formatAdditionalInfo,
  additionalInfoCheckAPI,
} = require("./Helpers");
const getRelationItemsDB = require("../../DB/DBFunctions/RelationFunctionsDB/getRelationItemsDB");
const { NotFoundErrorDB } = require("../../Errors/DB");
// ! -----------------------------------------------------------

/**
 * Description: Handles GET requests to retrieve a single book based on either book_id or book_name.
 *
 * This function checks for the presence of either a book ID or a title, retrieves the corresponding book from the database, formats its publish date, and sends the response.
 *
 * Middleware: None required.
 * Request Body: None required for this operation.
 *
 * @param {Object} req - The request object, containing query parameters for book_id or book_name.
 * @param {Object} res - The response object, used to send back the desired book data or an error message.
 * @param {Function} next - Express next function for error handling middleware.
 * @returns {Promise<void>} This function does not return anything directly, but sends a response containing the requested book data.
 * @throws {InputErrorBooksAPI} If neither book_id nor title is provided in the request.
 * @throws {BookNotFoundErrorAPI} If the specified book cannot be found in the database.
 * @throws {Error} If an unexpected error occurs during the database operation.
 *
 * @precondition None
 * @postcondition A response containing the requested book data is sent to the client, or an error is logged.
 */
async function getSingleBookAPI(req, res, next) {
  const book_id = req.params.book_id;
  const title = req.query.title;

  try {
    // Validate input
    if (!book_id && !title) {
      throw new InputErrorBooksAPI("Either book_id or title must be provided.");
    }

    // Call the database function to get the book data
    let book = book_id
      ? await getSingleBookDB({ book_id })
      : await getSingleBookDB({ title });

    if (!book) {
      throw new BookNotFoundErrorAPI("Book not found in the database.");
    }

    // Ensure publish_date is properly formatted for return
    book = formatBookPublishDatesAPI(book);

    const formattedInfo = await additionalInfoCheckAPI(book.id);

    // Send the book data as the response
    res.status(200).json({ ...book, ...formattedInfo });
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("getSingleBookAPI", error, next);
  }
}

module.exports = getSingleBookAPI; // Export the function for use in other modules
