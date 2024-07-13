// ! ---------------- IMPORTED FILES -------------------------
const getSingleBookDB = require("../../DB/DBFunctions/BookDB/GetBooksDB/getSingleBookDB");
const createBookDB = require("../../DB/DBFunctions/BookDB/createBookDB");
const {
  logErrorAPI,
  UserFeatureErrorAPI,
  ItemAlreadyExistsErrorAPI,
  MissingInformationErrorAPI,
} = require("../../Errors/API");
const { BookNotFoundErrorDB } = require("../../Errors/DB");
// ! -----------------------------------------------------------

/**
 * Description: Creates a new book record based on the provided request body.
 * Validates required fields and checks for existing book title.
 * Handles errors and logs them using API error handling.
 *
 * @param {Object} req - Express request object containing book information in req.body.
 * @param {Object} res - Express response object to send created book object on success.
 * @param {Function} next - Express next function to pass errors to the error handling middleware.
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
