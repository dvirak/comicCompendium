// ! ---------------- IMPORTED MODULES -------------------------
const logErrorAPI = require("../../Errors/API/logErrorAPI");
const {
  getAllBooksBasicDB,
} = require("../../DB/DBFunctions/BookDB/GetBooksDB");
const { formatBookPublishDatesAPI } = require("./Helpers");
const formatAllBooksWithAdditionalInfoAPI = require("./Helpers/formatAllBooksWithAdditionalInfoAPI");
// ! -----------------------------------------------------------

/**
 * Description: Retrieves basic information for all books in the database.
 *
 * This function calls the database to get all books and formats their publication dates before sending them in the response.
 *
 * Middleware: None required.
 * Request Body: None required for this operation.
 *
 * @param {Object} req - The request object for retrieving book information.
 * @param {Object} res - The response object to send the list of books.
 * @param {Function} next - The next middleware function for error handling.
 * @returns {Promise<void>} This function does not return anything directly, but it sends a response containing basic book information.
 * @throws {Error} If an error occurs while retrieving basic book information from the database.
 *
 * @precondition None
 * @postcondition A response containing basic book information is sent to the client.
 */
async function getAllBooksBasicAPI(req, res, next) {
  console.log("IN GET ALL BOOKS BASIC API");

  try {
    // Calls the database function to get all books
    const basicBooks = await getAllBooksBasicDB(req, res);

    // Format the publish_date for each book
    const formattedBooks = formatBookPublishDatesAPI(basicBooks);

    const fullyInformedBooks = await formatAllBooksWithAdditionalInfoAPI(
      formattedBooks
    );

    // Send list of books as the response
    res.status(200).json(fullyInformedBooks);
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("getAllBooksBasicAPI", error, next);
  }
}

module.exports = getAllBooksBasicAPI;
