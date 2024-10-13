// ! ---------------- IMPORTED FILES -------------------------
const { processBookInfoDB } = require("../../DB/DBFunctions/BookDB");
const { logErrorAPI, MissingInformationErrorAPI } = require("../../Errors/API");
// ! -----------------------------------------------------------

/**
 * Description: Creates or updates book information based on provided data.
 * If `book_id` is not supplied, the function can update based on the book's title in the request body.
 *
 * @param {Object} req - Express request object containing book data in the body.
 * @param {Object} res - Express response object for sending the created or updated book.
 * @param {Function} next - Express next function for error handling.
 * @returns {Promise<void>} This function does not return anything directly, but sends the created or updated book object as a response.
 * @throws {MissingInformationErrorAPI} If the required book information is missing in the request body.
 * @throws {Error} If an error occurs during the database process.
 *
 * @precondition None
 * @postcondition If successful, creates or updates the book record in the database and sends the book object in the response.
 */
async function createOrUpdateBookAPI(req, res, next) {
  console.log("IN createOrUpdateBookAPI");
  let bookInfo = req.body; // Book data from the request body
  let book_id = req.params.book_id; // Optional book_id from the request params

  // Check if book information is provided
  if (!bookInfo) {
    throw new MissingInformationErrorAPI(
      "You are missing information for the book in createOrUpdateBookAPI"
    );
  }

  try {
    // Process the book information in the database
    let book = await processBookInfoDB(book_id, bookInfo);
    res.send(book); // Send the created or updated book object as a response
  } catch (error) {
    // Log and throw any errors that occur during processing
    logErrorAPI("createOrUpdateBookAPI", error, next);
    // return next(error);
  }
}

module.exports = createOrUpdateBookAPI;
