const { logErrorDB } = require("../../../../Errors/DB");
const createBookDB = require("../createBookDB");
const { getSingleBookDB } = require("../GetBooksDB");
const updateBookDB = require("../updateBookDB");

/**
 * Description: Checks if a book exists in the database by either book_id or title;
 * if it does not exist, it creates a new book entry.
 * If it does exist and basic information is provided, it updates the existing book entry.
 *
 * @param {string} book_id - The ID of the book to check for existence (optional).
 * @param {Object} basicInfo - Information about the book to create or update (optional).
 * - `title` (string): Title of the book (required).
 * - `publish_date` (string): Publication date of the book.
 * - `description` (string): Description of the book.
 * - `print_length` (number): Number of pages in the book.
 * - `series_volume` (number): Volume number in the series.
 * - `cover_image` (string): URL of the book's cover image.
 * Note: None of the fields in `basicInfo` are required; they will be used if provided.
 *
 * @returns {Promise<Object>} The book object from the database after checking, creating, or updating.
 * @throws {Error} If an error occurs during the database operations.
 *
 * @precondition None
 * @postcondition A book entry is either retrieved, created, or updated in the database.
 */
async function checkOrCreateBookDB(book_id, basicInfo) {
  console.log("IN CHECK OR CREATE BOOKE DB");
  try {
    let title = basicInfo.title;
    let book = book_id
      ? await getSingleBookDB({ book_id })
      : await getSingleBookDB({ title });

    Object.keys(basicInfo).forEach(
      (key) => !basicInfo[key] && delete basicInfo[key]
    ); // removing empty values from basicInfo

    const hasBasicInfo = Object.keys(basicInfo).length > 0; // checking if basicInfo contains any values

    if (!book) {
      book = await createBookDB(basicInfo);
    } else if (book && hasBasicInfo) {
      book = await updateBookDB(book.id, basicInfo);
    }
    console.log(book);
    return book;
  } catch (error) {
    logErrorDB("checkOrCreateBookDB", error);
    throw error;
  }
}

module.exports = checkOrCreateBookDB;
