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

    // Check if a book with the same title already exists
    try {
      itemExists = await getItemDB({ table_name, item_name });
    } catch (error) {
      if (error instanceof NotFoundErrorDB) {
        itemExists = null;
      } else {
        throw error;
      }
    }

    if (itemExists) {
      throw new ItemAlreadyExistsErrorAPI(
        `${item_name} already exists in the ${table_name}s Table`
      );
    } else {
      // Create the new book record in the database
      const createdItem = await createItemDB({ table_name, item_name });

      // Send the created book object as the response
      res.status(201).json(createdItem);
    }
  } catch (error) {
    // Handle and log errors using API error logging middleware
    logErrorAPI("createItemAPI", error, next);
  }
}

module.exports = createItemAPI;
