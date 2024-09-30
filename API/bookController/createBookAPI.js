// ! ---------------- IMPORTED FILES -------------------------
const getSingleBookDB = require("../../DB/DBFunctions/BookDB/GetBooksDB/getSingleBookDB");
const createBookDB = require("../../DB/DBFunctions/BookDB/createBookDB");
const {
  logErrorAPI,
  ItemAlreadyExistsErrorAPI,
  MissingInformationErrorAPI,
} = require("../../Errors/API");
const { BookNotFoundErrorDB } = require("../../Errors/DB");
// ! -----------------------------------------------------------

/**
 * Description: Creates a new book record based on the provided request body.
 *
 * This function validates required fields and checks for an existing book title. It handles errors and logs them using API error handling middleware.
 *
 * Middleware: None required.
 * Request Body:
 * - `title` (string): Title of the book (required).
 * - `publish_date` (string): Publication date of the book (required).
 * - `description` (string): Description of the book (required).
 * - `print_length` (number): Number of pages in the book (required).
 * - `series_volume` (number): Volume number in the series (required).
 * - `cover_image` (string): URL of the book's cover image (required).
 * - `publisher` (string): The publisher of the book (relation data/optional).
 * - `series` (string): The series name (relation data/optional).
 * - `author` (string): The author of the book (relation data/optional).
 * - `illustrator` (string): The illustrators of the book (relation data/optional).
 * - `colorist` (string): The colorists involved (relation data/optional).
 * - `letterer` (string): The letterers involved (relation data/optional).
 * - `genre` (string): The genre(s) of the book (relation data/optional).
 * - `penciller` (string): The penciller of the book (relation data/optional).
 * Note: The relation data may or may not be included in the request body.
 *
 * @param {Object} req - The request object containing book information in req.body.
 * @param {Object} res - The response object used to send back the created book object on success.
 * @param {Function} next - The next middleware function to pass errors to the error handling middleware.
 * @returns {Promise<void>} This function does not return anything directly, but it sends the created book object as the response.
 * @throws {MissingInformationErrorAPI} If any required book information is missing in req.body.
 * @throws {ItemAlreadyExistsErrorAPI} If a book with the same title already exists in the database.
 * @throws {Error} If an unexpected error occurs during database operations.
 *
 * @precondition None
 * @postcondition If successful, creates a new book record in the database and sends the created book object in the response.
 */
async function createBookAPI(req, res, next) {
  const {
    title,
    publish_date,
    description,
    print_length,
    series_volume,
    cover_image,
  } = req.body;

  try {
    // Check if any required fields are missing
    if (
      !title ||
      !publish_date ||
      !description ||
      !print_length ||
      !series_volume ||
      !cover_image
    ) {
      throw new MissingInformationErrorAPI(
        "You are missing information for the book in createBookAPI"
      );
    }

    let bookExists;

    // Check if a book with the same title already exists
    try {
      bookExists = await getSingleBookDB({ title });
    } catch (error) {
      if (error instanceof BookNotFoundErrorDB) {
        bookExists = null;
      } else {
        throw error;
      }
    }

    if (bookExists) {
      throw new ItemAlreadyExistsErrorAPI();
    } else {
      // Create the new book record in the database
      const createdBook = await createBookDB(req.body);

      // Send the created book object as the response
      res.status(201).json(createdBook);
    }
  } catch (error) {
    // Handle and log errors using API error logging middleware
    logErrorAPI("createBookAPI", error, next);
  }
}

module.exports = createBookAPI;
