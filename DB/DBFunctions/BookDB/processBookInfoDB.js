// ! ---------------- IMPORTED FILES --------------------------
const { formatAdditionalInfo } = require("../../../API/bookController/Helpers");
const { logErrorDB } = require("../../../Errors/DB");
// const checkOrCreateItemDB = require("../MainFunctionsDB/checkOrCreateItemDB");
// const { createRelationsDB } = require("../RelationFunctionsDB");
const { checkOrCreateBookDB, createAdditionalInfoDB } = require("./helpers");
// ! -----------------------------------------------------------

/**
 * Description: Processes book information by either creating a new book entry or updating an existing one
 * based on the provided `book_id` and `bookInfo`. It handles the book's basic information and its related
 * entities like author, genre, etc.
 *
 * This function divides the book data into two parts:
 *  - `basicInfo`: Contains the main properties of the book (title, description, etc.).
 *  - `relations`: Contains any additional data such as related authors, genres, etc.
 * It creates or updates the book and then processes additional information (relations), merging both sets of data.
 *
 * @param {number} book_id - The unique identifier of the book. If null or undefined, the function will create a new book.
 * @param {Object} bookInfo - The object containing the book data.
 * @param {string} bookInfo.title - The title of the book.
 * @param {Date} bookInfo.publish_date - The publication date of the book.
 * @param {string} bookInfo.description - A brief description of the book.
 * @param {number} bookInfo.print_length - The total number of pages in the book.
 * @param {string} bookInfo.series_volume - Information about the book’s series and its volume.
 * @param {string} bookInfo.cover_image - URL or file path for the cover image.
 * @param {Object} [relations] - Additional relation data like author, genre, etc.
 *
 * @returns {Promise<Object>} The updated or newly created book object combined with its additional info (relations).
 * @throws {Error} Logs and throws any database-related errors encountered during processing.
 *
 * @precondition A valid bookInfo object must be provided, with required fields like title, publish_date, and description.
 * @postcondition The function will return an updated or new book entry combined with formatted additional info.
 */
async function processBookInfoDB(book_id, bookInfo) {
  console.log("IN PROCESS BOOK INFO DB");
  try {
    const {
      title,
      publish_date,
      description,
      print_length,
      series_volume,
      cover_image,
      ...relations // Additional info like author, genre, etc.
    } = bookInfo;

    // Extracting basic info needed for book creation/updation
    const basicInfo = {
      title,
      publish_date,
      description,
      print_length,
      series_volume,
      cover_image,
    };

    // Create or update the book entry in the database
    let book = await checkOrCreateBookDB(book_id, basicInfo);

    // Use the existing book_id if provided, otherwise, use the newly created book's ID
    book_id = book_id ? book_id : book.id;

    // Create or update additional information (e.g., authors, genres) related to the book
    let additionalInfo = await createAdditionalInfoDB(book_id, relations);

    // Format and merge additional information into the book object
    let formattedInfo = formatAdditionalInfo(additionalInfo);

    // Combine the basic book info and formatted additional info into the final book object
    let updatedBookInfo = { ...book, ...formattedInfo };

    // Return the updated book object
    return updatedBookInfo;
  } catch (error) {
    // Log and rethrow any errors encountered during processing
    logErrorDB("processBookInfoDB", error);
    throw error;
  }
}

module.exports = processBookInfoDB;
