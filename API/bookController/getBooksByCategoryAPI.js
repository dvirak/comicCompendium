// ! ----------------- IMPORTED FILES --------------------------
const getBooksByCategoryDB = require("../../DB/DBFunctions/BookDB/GetBooksDB/getBooksByCategoryDB");
const getItemDB = require("../../DB/DBFunctions/MainFunctionsDB/getItemDB"); // Function to get item information (e.g., categories) from the database
const { logErrorAPI, NotFoundErrorAPI } = require("../../Errors/API"); // Error handling and logging functions for API errors
const { NotFoundErrorDB } = require("../../Errors/DB"); // Error handling for database-specific errors
const { formatBookPublishDatesAPI, formatCategories } = require("./Helpers"); // Helper functions for formatting book dates and categories
// ! -----------------------------------------------------------

/**
 * Description: Retrieves books based on category filters provided in the query parameters.
 * @param {Object} req - Express request object containing query parameters for category filters.
 * @param {Object} res - Express response object to send the list of books or error messages.
 * @param {Function} next - Express next function to pass errors to the error handling middleware.
 */
async function getBooksByCategoryAPI(req, res, next) {
  let categoryNames = req.query; // Retrieve category filters from query parameters
  let categories = {}; // Object to hold category IDs

  try {
    // Loop through the category filters and retrieve corresponding IDs from the database
    for (const [table_name, item_name] of Object.entries(categoryNames)) {
      let categoryInfo = await getItemDB({ table_name, item_name });
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
      const error = new NotFoundErrorAPI(
        `No books were found for ${formatCategories(categoryNames)}`
      );
      return res.status(error.status).json({
        error: error.name,
        message: error.message,
        code: error.code,
      });
    }
    // Log error and pass it to the next middleware
    logErrorAPI("getBooksByCategoryAPI", error, next);
  }
}

module.exports = getBooksByCategoryAPI; // Export the function for use in other modules
