// ! ---------------- IMPORTED FILES -------------------------
const {
  createAuthorDB,
  getAuthorDB,
} = require("../../DB/DBFunctions/AuthorDB");
const {
  logErrorAPI,
  ItemAlreadyExistsErrorAPI,
  MissingInformationErrorAPI,
} = require("../../Errors/API");
const { AuthorNotFoundErrorDB } = require("../../Errors/DB");
// ! -----------------------------------------------------------

/**
 * Description: Creates a new author record based on the provided request body.
 * Validates required fields and checks for existing author name.
 * Handles errors and logs them using API error handling.
 *
 * @param {Object} req - Express request object containing author name in req.body.
 * @param {Object} res - Express response object to send created author object on success.
 * @param {Function} next - Express next function to pass errors to the error handling middleware.
 * @throws {MissingInformationErrorAPI} If any required author information is missing in req.body.
 * @throws {ItemAlreadyExistsErrorAPI} If an author with the same name already exists in the database.
 * @throws {Error} If an unexpected error occurs during database operations.
 *
 * @precondition None
 * @postcondition If successful, creates a new author record in the database and sends the created author object in the response.
 */

async function createAuthorAPI(req, res, next) {
  const { author_name } = req.body;

  try {
    // Check if any required fields are missing
    if (!author_name) {
      throw new MissingInformationErrorAPI(
        "You are missing information for the author in createAuthorAPI"
      );
    }

    let authorExists;

    // Check if a book with the same title already exists
    try {
      authorExists = await getAuthorDB({ author_name });
    } catch (error) {
      if (error instanceof AuthorNotFoundErrorDB) {
        authorExists = null;
      } else {
        throw error;
      }
    }

    if (authorExists) {
      throw new ItemAlreadyExistsErrorAPI(
        "The Author you are trying to add already exists in the database"
      );
    } else {
      // Create the new book record in the database
      const createdAuthor = await createAuthorDB({ author_name });

      // Send the created book object as the response
      res.status(201).json(createdAuthor);
    }
  } catch (error) {
    // Handle and log errors using API error logging middleware
    logErrorAPI("createAuthorAPI", error, next);
  }
}

module.exports = createAuthorAPI;
