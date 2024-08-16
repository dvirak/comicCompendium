// ! ---------------- IMPORTED FILES -------------------------
const {
  createAuthorDB,
  getAuthorDB,
} = require("../../DB/DBFunctions/AuthorDB");
const {
  getItemDB,
  createItemDB,
} = require("../../DB/DBFunctions/MainFunctionsDB");
const {
  logErrorAPI,
  ItemAlreadyExistsErrorAPI,
  MissingInformationErrorAPI,
} = require("../../Errors/API");
const { AuthorNotFoundErrorDB } = require("../../Errors/DB");
// ! -----------------------------------------------------------

/**
 * Description: Creates a new item record based on the provided request body.
 * Validates required fields and checks for existing item name.
 * Handles errors and logs them using API error handling.
 *
 * @param {Object} req - Express request object containing item name in req.body.
 * @param {Object} res - Express response object to send created item object on success.
 * @param {Function} next - Express next function to pass errors to the error handling middleware.
 * @throws {MissingInformationErrorAPI} If any required item information is missing in req.body.
 * @throws {ItemAlreadyExistsErrorAPI} If an item with the same name already exists in the database.
 * @throws {Error} If an unexpected error occurs during database operations.
 *
 * @precondition None
 * @postcondition If successful, creates a new item record in the database and sends the created item object in the response.
 */

async function createItemAPI(req, res, next, table_name) {
  const { item_name } = req.body;

  try {
    // Check if any required fields are missing
    if (!item_name) {
      throw new MissingInformationErrorAPI(
        "You are missing information for the item in createItemAPI"
      );
    }

    let itemExists;

    // Check if a book with the same title already exists
    try {
      itemExists = await getItemDB({ item_name });
    } catch (error) {
      if (error instanceof NotFoundErrorDB) {
        itemExists = null;
      } else {
        throw error;
      }
    }

    if (itemExists) {
      throw new ItemAlreadyExistsErrorAPI(
        "The Item you are trying to add already exists in the database"
      );
    } else {
      // Create the new book record in the database
      const createdItem = await createItemDB({ item_name });

      // Send the created book object as the response
      res.status(201).json(createdItem);
    }
  } catch (error) {
    // Handle and log errors using API error logging middleware
    logErrorAPI("createItemAPI", error, next);
  }
}

module.exports = createItemAPI;
