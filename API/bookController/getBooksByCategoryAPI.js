// ! ----------------- IMPORTED FILES --------------------------
const getBooksByCategoryDB = require("../../DB/DBFunctions/BookDB/GetBooksDB/getBooksByCategoryDB");
const getItemDB = require("../../DB/DBFunctions/MainFunctionsDB/getItemDB"); // Function to get item information (e.g., categories) from the database
const { logErrorAPI, NotFoundErrorAPI } = require("../../Errors/API"); // Error handling and logging functions for API errors
const { NotFoundErrorDB } = require("../../Errors/DB"); // Error handling for database-specific errors
const { formatBookPublishDatesAPI, formatCategories } = require("./Helpers"); // Helper functions for formatting book dates and categories
// ! -----------------------------------------------------------

/**
 * Description: Retrieves books based on category filters provided in the query parameters.
 *
 * This function fetches category IDs based on the provided category names in the query, retrieves the corresponding books from the database, formats their publish dates, and sends the response.
 *
 * Middleware: None required.
 * Request Body: None required for this operation.
 *
 * @param {Object} req - Express request object containing query parameters for category filters.
 * @param {Object} res - Express response object to send the list of books or error messages.
 * @param {Function} next - Express next function to pass errors to the error handling middleware.
 * @returns {Promise<void>} This function does not return anything directly, but sends a response containing the list of books.
 * @throws {NotFoundErrorAPI} If no books are found for the specified categories.
 * @throws {Error} If an error occurs while retrieving books from the database.
 *
 * @precondition None
 * @postcondition A response containing the list of books is sent to the client.
 */
async function getBooksByCategoryAPI(req, res, next) {
  console.log("in getBooksByCategoryAPI");
  let categoryNames = req.query; // Retrieve category filters from query parameters
  let categories = {}; // Object to hold category IDs

  try {
    // Loop through the category filters and retrieve corresponding IDs from the database
    for (const [table_name, item_name] of Object.entries(categoryNames)) {
      console.log("typeof item_name" + typeof item_name);
      console.log("can item be number?" + Number(item_name));

      let categoryInfo = Number(item_name)
        ? await getItemDB({ table_name, item_id: Number(item_name) })
        : await getItemDB({ table_name, item_name });
      console.log("back here");
      console.log(categoryInfo);
      if (categoryInfo === null) {
        throw new NotFoundErrorAPI(
          `The ${table_name} you were searching for was not found`
        );
      }
      categories[table_name] = categoryInfo.id;
    }
    console.log(categories);

    // Retrieve books based on the category IDs
    let books = await getBooksByCategoryDB(categories);

    // If no books are found, throw a NotFoundErrorAPI with a formatted message
    if (!books) {
      throw new NotFoundErrorAPI(
        `No books were found for ${formatCategories(categoryNames)}`
      );
    }

    // Format book publish dates for the response
    books = formatBookPublishDatesAPI(books);

    // Send the list of books as the response with status 200
    res.status(200).json(books);
  } catch (error) {
    // Handle errors and send appropriate responses
    if (error instanceof NotFoundErrorDB) {
      const errorResponse = new NotFoundErrorAPI(
        `No books were found for ${formatCategories(categoryNames)}`
      );
      return res.status(errorResponse.status).json({
        error: errorResponse.name,
        message: errorResponse.message,
        code: errorResponse.code,
      });
    }
    // Log error and pass it to the next middleware
    logErrorAPI("getBooksByCategoryAPI", error, next);
  }
}

module.exports = getBooksByCategoryAPI; // Export the function for use in other modules
