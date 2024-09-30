// ! ---------------- IMPORTED FILES -------------------------
const {
  getItemDB,
  createItemDB,
} = require("../../DB/DBFunctions/MainFunctionsDB");
const {
  logErrorAPI,
  ItemAlreadyExistsErrorAPI,
  MissingInformationErrorAPI,
} = require("../../Errors/API");
const { NotFoundErrorDB } = require("../../Errors/DB");
// ! -----------------------------------------------------------

/**
 * Description: Creates a new book record based on the provided request body.
 * Validates required fields and checks for existing book title.
 * Handles errors and logs them using API error handling.
 *
 * Middleware: None required.
 * Request Body:
 * - `title` (string): The title of the book.
 * - `publish_date` (string): The publication date of the book.
 * - `description` (string): A brief description of the book.
 * - `print_length` (number): The number of pages in the book.
 * - `series_volume` (string): The volume number in a series.
 * - `cover_image` (string): A URL or path to the book's cover image.
 * - `publisher` (string): The publisher of the book (optional).
 * - `series` (string): The series name (optional).
 * - `author` (string): The author of the book (optional).
 * - `illustrator` (string): The illustrators of the book (optional).
 * - `colorist` (string): The colorists involved (optional).
 * - `letterer` (string): The letterers involved (optional).
 * - `genre` (string): The genre(s) of the book (optional).
 * - `penciller` (string): The penciller of the book (optional).
 * Note: The relation data may or may not be included in the request body.
 *
 * @param {Object} req - Express request object containing book information in req.body.
 * @param {Object} res - Express response object to send created book object on success.
 * @param {Function} next - Express next function to pass errors to the error handling middleware.
 * @returns {Promise<void>} This function does not return anything directly, but it sends the created book object as the response.
 * @throws {MissingInformationErrorAPI} If any required book information is missing in req.body.
 * @throws {ItemAlreadyExistsErrorAPI} If a book with the same title already exists in the database.
 * @throws {Error} If an unexpected error occurs during database operations.
 *
 * @precondition None
 * @postcondition If successful, creates a new book record in the database and sends the created book object in the response.
 */

async function createItemAPI(req, res, next, table_name) {
  const item_name = req.body.name;
  console.log(`Creating ${item_name} in the ${table_name} table`);

  try {
    // Check if any required fields are missing
    if (!item_name || !table_name) {
      throw new MissingInformationErrorAPI(
        !item_name
          ? `You are missing the item_name in createItemAPI`
          : `You are missing the table_name in createItemAPI`
      );
    }

    let itemExists;

    // Check if an item with the same name already exists
    try {
      itemExists = await getItemDB({ table_name, item_name });
    } catch (error) {
      if (error instanceof NotFoundErrorDB) {
        itemExists = null; // No existing item found
      } else {
        throw error; // Rethrow unexpected errors
      }
    }

    if (itemExists) {
      // Throw error if item already exists
      throw new ItemAlreadyExistsErrorAPI(
        `${item_name} already exists in the ${table_name}s Table`
      );
    } else {
      // Create a new item record in the database
      const createdItem = await createItemDB({ table_name, item_name });

      // Send the created item object in the response
      res.status(201).json(createdItem);
    }
  } catch (error) {
    // Log the error and pass it to the error handling middleware
    logErrorAPI("createItemAPI", error, next);
  }
}

module.exports = createItemAPI;
